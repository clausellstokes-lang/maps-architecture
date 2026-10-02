# Coherence adjudication — round 7, the second family fix pass (coherence/adjudicate-r7w)

PROGRESS (lane `coherence/adjudicate-r7w`, 2026-10-02; fresh start, no earlier CHECKPOINT of this seat)
- [x] A1 read whole: the brief; the six family checks' second run (`famverify-{table,generation,epochs,hand,readers,
  tests}-r7v.md`) and their result JSONs; `adjudication-r7v.md` whole; `adjudication-r7.md` Part L (terms, laws 1–4,
  the check, the seven corrections, the restated veto list), Part H's head (the citation rule) and Part P pass 8;
  PROGRESS J144 – J151; the live text of every cited site, and every family test clause, by grep and in ranges
- [x] A2 the decision table and the class ruling (below): 42 rows
- [x] A3 Part H by unit, the builders' choices, the held notes; result JSON; LANDED

## What this pass is

Round 7 works the raised-way × wall family alone (J144). Its laws — Part L of `adjudication-r7.md`, normative under
J146 with J147 – J151, at home in §2.7's support step (6) — were written into the design and assembled
(`assemble-r7.md`); six family checks judged the live text, a first fix pass decided their 50 findings
(`adjudication-r7v.md`), twelve repair seats wrote the fixes and `assemble-r7v` installed them. The six checks then ran
again on that design, re-checking every earlier finding first (`famverify-*-r7v.md`). This file decides every finding
of that second run so that the repair seats can write the fixes and the six checks can run once more; the loop ends
when they find no major (J144, J151 (2)). Every text below is the exact wording a seat writes. Nothing here changes an
owner rule or a law, and no reading of the owner's words is recorded as the owner's: where a reason rests on J144 or
J147 beyond the owner's quoted words, it says "as the program reads it" (J122).

**The count.** The six result files hold **42 findings — 0 blocker, 8 major, 34 minor** — where the orchestrator's
notes say 40 (32 minor): the generation file landed 9 findings and the tests file 8, where the notes counted 8 and 7 from
their checkpoints. All 42 are decided here.

**Grading** (J146 refined by J151, PROGRESS; applied as `adjudication-r7v.md` applies it). A case where every outcome
keeps every law-1 invariant and every owner rule, passes the runtime check and fails no named test is a minor **valid
choice**: picked where the pick costs no words and keeps the laws whole, else listed for fix-list.md. A case with no
lawful outcome, an outcome breaking an owner rule or a law-1 invariant, a law-1 invariant no bar checks, or a check or
named test failing a correct build is MAJOR. §2.7's worked examples are non-normative (the laws govern), so an
example's slip is at most a minor; a pipeline step, an outcome row, a catalogue line, a fixture or a test is what a
builder builds or runs, so one whose literal outcome breaks a law-1 invariant or an owner rule, or a bar that fails a
correct build, is MAJOR. A citation, a restatement the laws already decide, a case a fixture may not hold, or a
scheduling cell is a minor. Where a finding called a case a valid choice and one of its outcomes is one that Part P
pass 8 ruled against an owner rule as the program reads it (PRB7H-GEN-04, PRB7H-LCK-04), it is no valid choice and is
re-graded.

**Totals.** 42 decided — **FIX 35**, **FIX, VALID CHOICE PICKED 0**, **VALID CHOICE LISTED 5** (VF7v-TBL-04, VF7v-TBL-05,
VF7v-GEN-05, VF7v-EPO-06, VF7v-RDR-05), **MERGED 2** (VF7v-HND-01 into VF7v-TBL-01; VF7v-EPO-02 into VF7-RDR-02),
**INVALID 0**. **Regraded 3**, each minor → major, each a FIX: VF7v-GEN-03, VF7v-GEN-04 and VF7v-GEN-06 (the reasons are
in their rows). Graded: **11 major** (the 8 reported and the 3 regraded), **31 minor**; every major is a FIX. **Laws
changed: none** — no finding needs a change to the laws themselves; Part L keeps its words (J150).

**Closed by class.** Three classes are closed once, each so that the next check cannot raise a member again:
* **The test-and-fixture class** (the ruling below): every family test clause asserts the outcome §2.7's laws give its
  fixture, naming a particular place, form, chamber or state only where the fixture's stated geometry fixes it. The
  rule is written once into §13.2 (S0), the lenses' members are fixed (VF7-TST-01, VF7v-TST-01 – -03, -06,
  VF7v-EPO-01), and a sweep of every other family clause — T110-1, T110-2 (1)–(8), T110-4, T-V1-51, T-V4-*, T-V5-14,
  T-V6-*, T-V7-*, T-V9-*, T-V10-* — fixes fourteen further members in the same words (C1 – C14).
* **The draw order** (VF7v-RDR-01): a raised deck is drawn in one slot above everything it crosses, its home §8.2's
  slot table (slot 19a), V01's neighbourhood list citing it (R1, V1-2).
* **The pull's impassables** (VF7-GEN-01, VF7v-GEN-01): one list, stated once at §4.4 S5a *Trace* (2) with every item
  widened as law 1 keeps the band and wall strips, and every reader citing it — *beneath*'s restated list struck for a
  citation (P1, P2, M6); V06 §3.7.6 (5) already cites it ("each widened as it says").

**How to read.** Disposition words are `adjudication-r7.md`'s: **FIX** applies the finding's required change as this
file words it (where this file's words differ from the finding's, this file's govern and the entry says why); an **END**
line is the exact text a unit writes for a fix another unit's finding asks of it, written under that unit; **CLASS**
marks a fix the class ruling's sweep finds in a clause no finding names. Every text quoted "old → new" keeps every
other word as it stands; a quoted old text may run across a line break. Line numbers are the live files' as the six
checks read them (`docs/ARCHITECTURE.md` unless a volume is named); a seat locates each old text by its words. No review
id (VF7…, PRB7…) is written into the design (R3-02). Where two fixes edit one row or sentence, each edits only the words
it quotes. R7-01 (2)'s sweep stands: each seat greps its own unit for every restatement of a text it changes and
conforms it in the same block, naming each in its report. Every citation a seat writes follows Part H's head: "§2.7's
laws, law n; its worked example …".

## The decisions

| id | lens | sev | grade | disposition | writes | reason |
|---|---|---|---|---|---|---|
| VF7v-TBL-01 | table | minor | minor | FIX | model | Row (b)'s gates cell and W2's last column move a gate "clear of the strip" where law 1 (5) with law 2 (a) and law 3 take it to the nearest point the laws admit (under a clearing arch it may lie in the strip); §7.1's row and T110-2 (5) already say so. The example corrected (M1). VF7v-HND-01 merged here. |
| VF7v-TBL-02 | table | minor | minor | FIX | model | *Where the line crosses* and the bent group's lawful crossing admit a band "through a `cleared` support's ring" with no condition on the fallen spans either side, which law 1 (2) reads by their recorded soffits; *beneath*'s own impassables already carry it. Examples corrected (M2). |
| VF7v-TBL-03 | table | minor | minor | FIX | model | The fixed-place sentence and *No gate and no tower* admit an anchor under a clearing arch; law 1 (4) and correction 7 keep an anchor out of every raised way's strip. Examples corrected (M3). |
| VF7v-TBL-04 | table | minor | minor (valid choice) | VALID CHOICE LISTED | — | Law 1 (5)'s "never on a support's ring" read of every ring or of a standing one: both keep law 1 as each reads it and every owner rule, pass the check, fail no named test. A pick adds a word to the laws (J150), so listed. |
| VF7v-TBL-05 | table | minor | minor (valid choice) | VALID CHOICE LISTED | — | A run re-sectioned under an older aqueduct counted in `walls.raisedCrossings` or not: no invariant, check or named test reads the count. Listed. |
| VF7-GEN-01 | generation | major | major | FIX | pipeline; END model | S5a's pull list — the one list *beneath*, V06's cost field and a hand `contractWall` take — keeps only the line off an over crossing's standing supports and low spans, so the band reaches over a ring or under a low span (law 1 (2)), failing §5.3's law-1 row. The list widened once at its home, *beneath*'s restatement struck for a citation (P1, M6). |
| VF7v-GEN-01 | generation | major | major | FIX | pipeline | The same list keeps only the line off a raised way's strip but to cross (law 1 (4)) and a shape-locked raised way's `vault`-use spans (law 1 (10)): a build of it lays a band in a strip or wall strips across a locked vault, failing §5.3's row and T110-4 (c). Widened in the same sentence (P2). |
| VF7v-GEN-02 | generation | minor | minor | FIX | model | The bent group's lawful crossing keeps only the line off a shape-locked raised way's `vault`-use span; law 1 (10) keeps band and wall strips off too. Example corrected (M4). |
| VF7v-GEN-03 | generation | minor | **major** (regraded) | FIX | pipeline | **Regraded:** S5a moves a pin only when its crossing falls ON a ramp, stair or foot or its footprint meets a strip; a pin just past the foot, or whose wall strips lie over another raised way's ends, stays, no lawful line passes it and F-WALL's rung leaves the stage unwalled, where law 2 (a) moves the pin along its arterial to a lawful place. That outcome is "a stage given way where a lawful gate stood", which pass 8 ruled against J144 as the program reads it (PRB7H-GEN-04 (i)); so not every outcome keeps the owner rules — no valid choice (J151). Fixed with S3 (7)'s picked trigger (P3). |
| VF7v-GEN-04 | generation | minor | **major** (regraded) | FIX | pipeline; its T110-2 (6) END decided at VF7v-TST-03 | **Regraded:** S3 (7) re-routes a carried way "where §2.7's laws give it no lawful gate", readable at the crossing point, while S5a's pin rule (run by S3 (9)) first moves the gate along the way. The re-route-first reading diverts a declared or kept road where law 2 (a) gave it a lawful gate — the reading pass 8 ruled out ("the re-route only after law 2 (a)", PRB7H-LCK-04, -GEN-04: a road diverted where a gate was lawful, against item 101 R2 as the program reads it). No valid choice (J151). S3 (7) worded in law 2's order (P4); the bar's seed condition is one text with VF7v-TST-03's (S4). |
| VF7v-GEN-05 | generation | minor | minor (valid choice) | VALID CHOICE LISTED | — | A pick no route crosses `T = t_1` lawfully: F-ROUTE's last rung over lawful first points, or the pick re-drawn as a closed arc's then dropped; both lawful, reported, passing every bar. A pick costs a clause of words, so listed. |
| VF7v-GEN-06 | generation | minor | **major** (regraded) | FIX | pipeline | **Regraded:** S5a's outer moat claims to meet "only arterials", so a carried way standing before the stage (a creation prefix's drawn one among them) of a lower class is cut by §4.11's way rule just outside its own gate. Cutting a drawn carried way is the outcome pass 8 ruled against J144 and J147 (1) as the program reads them (PRB7H-GEN-04 (ii)); the other build decks it. No valid choice (J151). Decked as at stage 1 (P5). |
| VF7v-GEN-07 | generation | minor | minor | FIX | pipeline | S3 (10) reads (5)'s routes' raised stretches only "at generation", where S3 (7) re-solves them at a regeneration too; a reader omission, no invariant crossed (P6). |
| VF7v-GEN-08 | generation | minor | minor | FIX | determinism | §5.4's `W_RAISED_MEETING` list and §5.2's F-CASTLE detection omit the castle outcome law 2 (c) gives at generation; no bar counts it (D1). |
| VF7v-EPO-01 | epochs | major | major | FIX | V06; END scope | T-V6-73 (T110-2 (1)) founds across a hand-`breached` CITY ring on H-AQUA, whose epoch runs `fortification` before `raisedWays`; under the one site threat H-AQUA's METROPOLIS circuit needs, the ring in use is repaired at that step (V06 §3.7.5's in-use rule, §3.7.7 (3)'s NEED-`high` rows) and the bar's "no `repairWall`" fails a correct build. Fixed by the device the state sweep and T110-2 (7) already use — the ring placement-locked by the script once breached, "a locked or pinned ring is held" (V06 §3.7.5; §3.1) — not by the finding's threat script: §3.7.5's in-use repair reads `walls.neglectThreatMax`, not `threatMin`, so a threat below `threatMin` need not stop it, and a threat held low "from the fixture's start" may stop the circuits H-AQUA's other clauses need (V6-1, S9). |
| VF7v-EPO-02 | epochs | minor | minor | MERGED into VF7-RDR-02 | — | The same V06 §3.2 restatement of law 1 (8)'s replaced chamber clause; written once under VF7-RDR-02 with both its sites (V6-2). |
| VF7v-EPO-03 | epochs | minor | minor | FIX | V07 | T-V7-48 cites the way-and-channel table alone (Part H's citation rule) (V7-1). |
| VF7v-EPO-04 | epochs | minor | minor | FIX | V06; END V07, determinism | Four restatements name a held building's strip and omit a shape-locked raised way's `vault`-use span, which their "no lawful crossing" covers (V6-3, V7-2, D5). |
| VF7v-EPO-05 | epochs | minor | minor | FIX | V06 | V06 §3.19 (5) and §2.10's `raised.waited` omit two cases their cited laws decide: no merge into a shape-locked curtain (law 1 (10)) and a road deck's fixed end under a curtain's line, band or wall strips (law 1 (4)) (V6-4). |
| VF7v-EPO-06 | epochs | minor | minor (valid choice) | VALID CHOICE LISTED | — | A non-citadel elevated road's anchor whose end would lie under a wall: the candidate waits (ends fixed) or the anchor is read as the citadel's is; both lawful, passing T-V6-57 and T110-3. Listed. |
| VF7v-EPO-07 | epochs | minor | minor | FIX | V06 | V06 §3.7.6 (5) binds every trace but not (3)'s harbour-mouth chain, a fixed place the fixed-place sentence names; law 4 binds it anyway (V6-5). |
| VF7v-EPO-08 | epochs | minor | minor | FIX | scope | T110-4 (a)'s T-V6-48 variant puts a declared viaduct over the harbour mouth §4.3 excludes; the case is unrun (S8). |
| VF7v-EPO-09 | epochs | minor | minor | FIX | model | Row W14 makes the REPLACEMENT wait where a stone gatehouse "would meet a strip", where law 1 (5) admits it under a clearing arch. Example corrected (M5). |
| VF7v-HND-01 | hand | minor | minor | MERGED into VF7v-TBL-01 | — | The same row (b) gates cell, "clear of the strip". |
| VF7v-HND-02 | hand | minor | minor | FIX | determinism; END scope | Law 4's undo refusal (an exact inverse that would break law 1) has no home in §7.4 *Independence* or §7.1's undo row; every build keeps law 1 by the dry run's §5.3 check, but one maps it to `refuse.undo.dependent` and another to an unmapped failure (D2, S10). |
| VF7v-HND-03 | hand | minor | minor | FIX | determinism; END V09 | Five hand sites read "held"/"locked" without J147's shape axis, giving a shape-locked wall a gate or merge if read so; no op makes a shape lock before round 8 (D3, V9-3). |
| VF7v-HND-04 | hand | minor | minor | FIX | determinism; END model | F-WALL's hand clause and W1 read "its own re-pull" as possibly the rung's widened re-pull; law 2 (c) gives a hand op its own pull and a refusal (D4, M7). |
| VF7v-HND-05 | hand | minor | minor | FIX | V09; END determinism | A castle sited or resized by hand and bent by the laws has no row cause and no V09 line (V9-1, D6). |
| VF7v-RDR-01 | readers | major | major | FIX | rendering; END V01 | §8.2's slot table (with V01 §5.1.3's copy and §8.3's census) draws curtain walls, towers and gate blocks (18, 19) over raised decks (14), against item 110 (b)'s "rendered above what it crosses" and §4.3, where a wall runs beneath a deck or arch or a gate stands under a clearing arch; the census fails the build that keeps the owner's rule. Decks move to one slot, 19a, at §8.2; V01 cites it (R1, V1-2). |
| VF7-RDR-02 | readers | minor | minor | FIX | V06; END pipeline | V06 §3.2 and II.7.6 restate law 1 (8)'s replaced chamber clause; V04 lays and §5.3 checks, so nothing built changes. VF7v-EPO-02 merged here (V6-2, P7). |
| VF7v-RDR-02 | readers | minor | minor | FIX | V01 | V01 §3.17.3 (3) cites the way-and-channel table alone (V1-1). |
| VF7v-RDR-03 | readers | minor | minor | FIX | V09 | T-V9-61 cites file f item 447, whose span `use` is the record's, where §11.1 exports it as the laws read it (V9-2). |
| VF7v-RDR-04 | readers | minor | minor | FIX | V10 | T-V10-41's seed search admits a span too small for a chamber (V04 §3.5.4 (d) (1)), which a correct build leaves with none (V10-1). |
| VF7v-RDR-05 | readers | minor | minor (valid choice) | VALID CHOICE LISTED | — | `bend.wall.aqueductArch` for one stroke over walls whose levels give different forms: one line per wall or one line with the rest in the effects; no bar counts lines. Listed. |
| VF7-TST-01 | tests | major | major | FIX | scope | T110-2 (4)'s ramp runs are placed by the distance to the foot, not to the first point beyond it, which law 3 measures; a stroke at a ramp's midpoint meets the bar's words and a correct build bends it under the deck. The class (S1). |
| VF7v-TST-01 | tests | major | major | FIX | scope | T110-2 (1)'s low-channel hand aqueduct asserts the over form where law 3 may pick a nearer merged crossing by level. The class (S2). |
| VF7v-TST-02 | tests | major | major | FIX | scope | T110-2 (8)'s second run lays the chamber after the intervallum's delete while the ring road `wallToWay` laid still crosses the span (law 1 (8)): it fails every correct build. The class (S3). |
| VF7v-TST-03 | tests | major | major | FIX | scope | T110-2 (6)'s third run asserts the re-route on a seed tested at the crossing point only, where law 2 (a) moves the gate along the way first. The class (S4; VF7v-GEN-04's END decided here). |
| VF7-TST-11 | tests | minor | minor | FIX | scope | W1·C8's named test, T110-4 (c), gives its village rung no raised way; no invariant unchecked (S5). |
| VF7v-TST-04 | tests | minor | minor | FIX | V06 | V06 §8 schedules T-V6-47's epoch `shiftCourse` clause at E3, before its provider E5 (V6-6). |
| VF7v-TST-05 | tests | minor | minor | FIX | scope; END V06 | Three epoch clauses of T110-2 (1) and (2) are taken by no volume test, and §13.8 leaves two at M3a (S6, V6-7). |
| VF7v-TST-06 | tests | minor | minor | FIX | scope; END V04 | Three chamber re-lays after a wall's delete name no seed condition keeping a way (an intervallum) off the span, which law 1 (8) would keep `open`; a case the fixture may not hold. The class (S7, V4-1). |

## The class ruling — every family test clause asserts the laws' outcome for its fixture

**The class.** The tests lens found all four of its majors in one class, and the epochs lens one more member: a test
clause that pins one outcome where §2.7's laws choose — the place law 3's nearest picks (VF7-TST-01), the form an
aqueduct's level gives (VF7v-TST-01), the place law 2 (a) gives before (b) (VF7v-TST-03) —, that asserts a chamber laid
again while law 1 (8) still reads its span `open` (VF7v-TST-02; VF7v-TST-06 where the fixture may hold a way there), or
whose fixture's scripted state an earlier step of the same epoch changes before the asserted op (VF7v-EPO-01).

**The ruling.** Every test clause of this family — T110-1, T110-2 (1)–(8) and T110-4, and every volume bar that takes
one of them or cites §2.7's laws — asserts the outcome §2.7's laws give its fixture: a place a stroke, a drag or a
costless rule sets where law 3 picks it; a pulled, cost-field or searched op's place where its own cost does (law 2
(a)); an aqueduct's crossing in the form its level there gives (law 1 (2)); a chamber laid again only once nothing lies
across its span's strip (law 1 (8)); a fixture's state as the epoch's own step order leaves it at the clause's op (V06
§3.2). A clause names a particular place, form, chamber or state only where its fixture's stated geometry fixes it, its
seed searched so; and where a clause's words and that outcome differ, the bar asserts the outcome — so a residue of the
class can no longer fail a correct build. The rule is written once, into T110-2's lead (S0), and each member's own
words are fixed so that each clause holds its case.

**The sweep.** Every family clause was read against the rule. The lenses' members are fixed by their findings (S1 –
S4, S7, S9, V6-1, V4-1). Fourteen further members, no finding naming them, are fixed here as CLASS entries:

| # | clause | why it is a member | fix |
|---|---|---|---|
| C1 | T110-2 (4): a hand `drawWall` through a standing aqueduct's support "where its channel runs above the wall's top, bent … to cross under the nearest span that clears the wall" | the over form is fixed at the support only; along the bend's reach a merged crossing may lie nearer (law 1 (2), law 3), and the nearest clearing span need not be the nearest lawful crossing | S11 |
| C2 | T110-2 (4): an epoch circuit "— the circuit crossing under that span" (the locked arch vault) | a cost field's crossing is its own cost's (law 2 (a)); the fixture does not say its seed puts it there | S7 (with VF7v-TST-06's words) |
| C3 | T110-2 (4): the held building's hand `drawWall` "moved … to the nearest crossing clear of the building's widened strip" | the nearest crossing clear of the widened strip may be unlawful (a low span, a standing support in an over crossing); law 3 picks the nearest lawful one | S11 |
| C4 | T110-2 (4): the held building's re-shape and Arch spacing edit "bent to the nearest course or spacing that keeps the line out of it" | the nearest such may be unlawful in another clause of law 1; law 3 picks the nearest lawful one | S11 |
| C5 | T110-2 (4): the table-edit variant, "its channel there running above the ring's top (… over, never merged)" | "there" fixes the form at the planned line only; the circuit's search band and the strokes' reach may meet a merged crossing | S11 |
| C6 | T110-2 (6): New random's ring meeting a support — "under a span, never at a support"; the merged variant "merged wherever the boundary meets the deck line" | the new ring crosses at a new place, where the level may give the other form | S11 |
| C7 | T110-2 (6): the sweep's New random "the trace through the cleared ring" | the pull's crossing is its own cost's; a band through a `cleared` ring is lawful only where both fallen spans' recorded soffits clear the top (law 1 (2)) | S11 |
| C8 | T110-2 (7): the epoch circuit and contraction "through the cleared ring" | as C7, for the epoch's cost field | S11 |
| C9 | T110-4 (a): the merged run on (1)'s variant, "the ring crossing the aqueduct merged there" | the new ring's crossing place and its level there are not fixed by the seed condition | S11 |
| C10 | T-V4-80 (i): "the hand `drawWall` moved … to the nearest crossing clear of the building's widened strip"; its circuit "across that span"; its chamber re-lays | as C3, C2 and VF7v-TST-06 | V4-1 |
| C11 | T-V6-47: the restated (7) clause, "the trace through the cleared ring" and "through its former ring" | as C8 | V6-8 |
| C12 | T-V6-11: an aqueduct founded "while a `breached` run there stands" | the state the founding reads is the one the epoch's earlier steps leave (V06 §3.2, §3.19 (2)) | V6-8 |
| C13 | T-V7-48: the palisade "planned across a standing support … whose channel there runs above the palisade's top — bent … to cross under the nearest span clearing that top", and the T3 `wall` stroke likewise | as C1, for VS3's palisade and a village stroke | V7-3 |
| C14 | T-V9-52: an aqueduct stroke "whose channel there runs above the wall's top over it on one of its arches, … its spans clearing" | above the top by less than the deck's depth its span over the band would not clear and law 3 may pick a merged crossing (VF7v-TST-01's case) | V9-4 |

Read and holding (no member): T110-1; T110-2 (1)'s over-band, merged, retaining, tower and fixed-place runs, (2), (3),
(5), (4)'s other hand and epoch rows, (6)'s keep and carried-way runs (VF7v-TST-03 aside), (8)'s first and third runs;
T110-3; T110-4 (b), (c) (VF7-TST-11 aside); T-V1-51; T-V4-62 and T-V4-63's other clauses; T-V5-14; T-V6-48, -61, -64 and
T-V6-73's other clauses; T-V9-58 and T-V9-61 (their held note and VF7v-RDR-03); T-V10-40, -42. One member lies outside
the family and is held, as the tests lens held its twin in T-V9-52: T110-2 (6)'s "that route re-solved to cross under the
nearest span the rule admits" pins a place a route's cost chooses, but the meeting is a raised way's with a ground way,
no wall (*Held*, item 10).

## Part H — by unit

Each unit's work: its FIXes, then the END lines other units' findings ask of it, then its CLASS entries. "old → new"
keeps every other word as it stands. Where a text below differs from the finding's required change, the note after it
says why.

### model (base §2)

Writes VF7v-TBL-01 (VF7v-HND-01 merged), VF7v-TBL-02, VF7v-TBL-03, VF7v-GEN-02 and VF7v-EPO-09 (its FIXes); the ENDs of
VF7-GEN-01 and VF7v-HND-04. No END-L line: the laws keep their words. Every edit is inside §2.7's support step (6)'s
worked examples.

**M1 · VF7v-TBL-01 (FIX; VF7v-HND-01 merged)** —
* the way-and-channel table, row (b), its gates cell (l. 2914): "such a crossing of the trace is moved along the deck to
  the nearest crossing clear of the strip (`bend.raised.underSpan`, its wall form)" → "such a crossing of the trace is
  moved along the deck to the nearest crossing at which these laws admit its gate (law 1 (5), law 2 (a), law 3;
  `bend.raised.underSpan`, its wall form)". (The two findings' words as one text, with VF7v-HND-01's law 2 (a).)
* the crossing table, row W2, its last column (l. 3341): "a gate it makes for a ground way where law 1 (5) bars one
  placed along that way clear of the strip, the stretch bent through it" → "a gate it makes for a ground way where law 1
  (5) bars one placed along that way at the nearest point these laws admit it (law 2 (a), law 3), the stretch bent
  through it".

**M2 · VF7v-TBL-02 (FIX)** —
* *beneath*'s *Where the line crosses* (l. 3061–3062): "or through a `cleared` support's ring (open ground: both its
  spans fallen, C5), never through a standing support" → "or through a `cleared` support's ring (open ground: both its
  spans fallen, C5) where every span above the band, standing or fallen, clears that top, never through a standing
  support".
* the bent-group sentence's **lawful crossing** (l. 3184–3185): "under a span that clears it or through a `cleared`
  support's ring (open ground, C5)," → "under a span that clears it or through a `cleared` support's ring (open ground,
  C5) where every span above its band, standing or fallen, clears it,".

**M3 · VF7v-TBL-03 (FIX)** —
* the fixed-place sentence, *A raised way created after the wall* (l. 3261): "and an aqueduct each out of its strip but
  under arches that clear it," → "and an aqueduct each out of its strip but under arches that clear it, an anchor out of
  it always (law 1 (4)),".
* *beneath*'s *No gate and no tower* (l. 3158–3159): "and out of an aqueduct's strip but under arches that clear it (law
  1 (6); the fixed-place sentence)" → "and out of an aqueduct's strip but under arches that clear it, an anchor's tower
  out of it always (law 1 (4), (6); the fixed-place sentence)".

**M4 · VF7v-GEN-02 (FIX)** — the bent-group sentence (l. 3188–3189): "and its line never in a held building's widened
strip nor newly across a shape-locked raised way's `vault`-use span's strip (law 1 (9), (10))" → "and its line never in a
held building's widened strip, nor its line, band or wall strips newly across a shape-locked raised way's `vault`-use
span's strip (law 1 (9), (10))". (The finding's content in fewer words.)

**M5 · VF7v-EPO-09 (FIX)** — the crossing table, row W14 (l. 3353):
* its event cell: "the REPLACEMENT waiting where a standing gate's stone footprint would meet a strip," → "the
  REPLACEMENT waiting where a standing gate's stone footprint would lie where law 1 (5) bars it (in a road deck's
  under-deck strip, or in an aqueduct's but under arches that clear it),";
* its C2 cell: "a re-section whose new footprint of one would meet a strip," → "a re-section whose new footprint of one
  would lie where law 1 (5) bars it,".

**M6 · END for VF7-GEN-01 — the one list** — *beneath*, the impassables of a pulled or cost-field trace (l. 3076–3085):
"treats as impassable to its line the impassables these laws give a trace (law 1 (2)–(4), (9), (10); the list §4.4 S5a
*Trace* (2) gives): a standing raised way's ramps, stairs and feet widened by the wall strips' width there, its strip but
to cross its deck line once, the deck line of every road deck whose stretch there is dated after the stage's boundary
pick, where an aqueduct's channel runs above the wall's top, its standing supports and the strip of each span whose
soffit does not clear the wall's top (each widened so that the band's half at most touches the ring or that strip, *the
edge*; law 1 (2): a crossing that fits neither form unlawful), a carried way's ground course beyond each foot where the
stage's boundary crossed only its deck, every held building's widened strip (below) and a shape-locked raised way's
`vault`-use spans' strips (as V06 §3.7.4 (2)'s cost field treats every standing support);" → "treats as impassable to its
line the impassables these laws give a trace, each widened as the one list of them, §4.4 S5a *Trace* (2), states it (law
1 (2)–(4), (9), (10); V06 §3.7.4 (2)'s cost field taking that list);". (The brief's one list stated once: the items and
their widenings live at S5a, P1 and P2; *beneath* cites them. *Line and band*, which states the principle for every
keep-clear of the table, the bent group's among them, keeps its words.)

**M7 · END for VF7v-HND-04** — the crossing table, row W1, its last column (l. 3340): "a hand op refused once its own
re-pull fails, never a stage left unwalled (law 2 (c))" → "a hand op refused once its own pull, within its own search
band, finds no lawful shape, its band never widened and never a stage left unwalled (law 2 (a), (c))".

### kernel (base §3)

No work: no finding, END line or class member names base §3.

### pipeline (base §4, §10, PART II, PART III)

Writes VF7-GEN-01, VF7v-GEN-01, VF7v-GEN-03, VF7v-GEN-04, VF7v-GEN-06 and VF7v-GEN-07 (its FIXes) and the END of
VF7-RDR-02. P1 – P3 edit different words of §4.4 S5a *Trace* (2). VF7v-GEN-05 is a listed builders' choice; nothing is
written for it.

**P1 · VF7-GEN-01 (FIX) — the one list, widened once** — §4.4 S5a *Trace* (2) (l. 6601):
* "the impassables §2.7's laws give a trace (law 1 (2)–(4), law 1 (9) and (10)) impassable to it —" → "the impassables
  §2.7's laws give a trace (law 1 (2)–(4), law 1 (9) and (10); the one list of them, which every pull, cost field and
  reader of them cites) impassable to it —";
* "its standing supports and the strip of each span whose soffit does not clear the wall's top (law 1 (2): a crossing
  that fits neither form unlawful)," → "its standing supports and the strip of each span whose soffit does not clear the
  wall's top, each widened so that the band's half at most touches the ring or that strip (*the edge*; law 1 (2): a
  crossing that fits neither form unlawful),".
V06 §3.7.6 (5) ("each widened as it says") and *beneath* (M6) then read this one list.

**P2 · VF7v-GEN-01 (FIX)** — the same list (l. 6601):
* "its strip but to cross its deck line once," → "its strip, widened each side by the band's half there, but to cross
  its deck line once (law 1 (4)),";
* "every held building's strip and a shape-locked raised way's `vault`-use spans' strips)" → "every held building's strip
  and a shape-locked raised way's `vault`-use spans' strips, each widened all round by the wall strips' width there (law
  1 (10): no line, band or wall strip across one))".
S5a (1)'s anchor rule ("never in a standing raised way's strip", l. 6585) is closed by the first widening, an anchor
ending the pulled line.

**P3 · VF7v-GEN-03 (FIX; regraded major)** — S5a *Trace* (2)'s pin rule (l. 6602):
* "one whose crossing falls on a ramp, stair or foot pins its gate" → "one whose crossing falls on a ramp, stair or foot,
  or nearer its foot than the first point beyond the foot, pins its gate";
* "meets a raised way's under-deck strip where §2.7's laws bar a gate (law 1 (5): any but under an aqueduct's arch that
  clears it) moves along its arterial until that footprint is clear" → "meets a raised way's under-deck strip where
  §2.7's laws bar a gate (law 1 (5): any but under an aqueduct's arch that clears it), or whose band or wall strips there
  would lie over a raised way's ends (law 1 (4)), moves along its arterial until both are clear".
(The finding's words; they give S5a the trigger S3 (7) took in the first fix pass, VF7-GEN-05's pick.)

**P4 · VF7v-GEN-04 (FIX; regraded major)** — §4.2 S3 (7), its carried-way sentence (l. 6226): "where §2.7's laws give it
no lawful gate, the way is re-routed through one of the stage's gates (§2.7's laws, law 2 *Carried way*, (a), (b))" →
"its gate, where law 1 (4) or (5) bars it there, moved along the way within (9)'s search band as S5a's pin is (§4.4 S5a
*Trace* (2); §2.7's laws, law 2 (a)), and only where §2.7's laws give it no lawful gate so, the way re-routed through one
of the stage's gates (§2.7's laws, law 2 *Carried way*, (a), (b))". (The finding's sense in law 2's order; "where law 1
(4) or (5) bars it" in place of "where its gate's footprint meets a strip", so that the trigger is P3's.) T110-2 (6)'s
seed condition is S4.

**P5 · VF7v-GEN-06 (FIX; regraded major)** — §4.4 S5a *Outer moats* (l. 6633–6636): "Its way rule meets only arterials
here — each just outside one of the stage's gates, the stage's secondaries not yet grown — so every way is kept with a
deck and nothing is cut: the L1 batch places each deck's two pinned bank vertices on its arterial where a wet stretch's
banks will cross it — the `deck_end` rows of a fresh `Bridge`, `built` with that arterial as its way (§2.7) —" → "Its way
rule meets only arterials and a carried way standing before the stage here — each just outside one of the stage's
gates, the stage's secondaries not yet grown — so every way is kept with a deck and nothing is cut, a carried way decked
at its gate as at stage 1 (§4.2 S3 (10); §2.7's laws, law 2 *Carried way*): the L1 batch places each deck's two pinned
bank vertices on its arterial or carried way where a wet stretch's banks will cross it — the `deck_end` rows of a fresh
`Bridge`, `built` with that arterial or carried way as its way (§2.7) —". (The finding's words, and the `Bridge`'s way
named with them.)

**P6 · VF7v-GEN-07 (FIX)** — §4.2 S3 (10) (l. 6297): "at generation, besides, the raised stretches of (5)'s routes" →
"at generation and at a regeneration, besides, the raised stretches of (5)'s routes".

**P7 · END for VF7-RDR-02** — PART II, II.7.6's vaults sentence (l. 22795): "— but one read `open` (§2.7's laws, law 1
(8); its worked example the crossing table's *beneath*; V04 §3.5.4 (d) (1)) — holds one arch vault" → "— but one read
`open` (§2.7's laws, law 1 (8); its worked example the crossing table's *beneath*) and one whose inset rectangle V04
§3.5.4 (d) (1) finds too small, reported — holds one arch vault".

### determinism (base §5–§7)

Writes VF7v-GEN-08, VF7v-HND-02, VF7v-HND-03 and VF7v-HND-04 (its FIXes) and the ENDs of VF7v-EPO-04 and VF7v-HND-05.
§7.1's lock row, §7.2, §7.3 item 4, §7.4's lock column and §5.3's declared row keep their words (`adjudication-r7.md`
Part A; J150); none is edited here. D3 and D6 edit different words of §7.1's `bend.wall.raisedCrossing` row; D4 and D5
different words of §5.2's F-WALL row.

**D1 · VF7v-GEN-08 (FIX)** —
* §5.4, the `warnings` comment's `W_RAISED_MEETING` list (l. 9982): "; a harbour-mouth chain not laid, §4.8)" → "; a
  harbour-mouth chain not laid, §4.8; a castle §4.2 S3 (8)'s filter rejects at every candidate, re-sited or kept without
  a bailey by F-CASTLE's ladder, §5.2)".
* §5.2's F-CASTLE row, its detection (l. 9853): "the claim overlaps water or the plaza" → "the claim overlaps water or
  the plaza; no candidate §4.2 S3 (8)'s filter admits for a raised way (§2.7's laws, law 2 (c); its worked example the
  fixed-place sentence), entering at the re-site rung".

**D2 · VF7v-HND-02 (FIX)** —
* §7.4 *Independence* (l. 12020–12022): "disjoint from the target's touched set and from the target's effective-scope
  faces dilated by one ring of adjacent faces at the coarsest level either touches." → "disjoint from the target's
  touched set and from the target's effective-scope faces dilated by one ring of adjacent faces at the coarsest level
  either touches, and its structure is none that the target's exact inverse or re-application would meet where §2.7's
  laws would not then hold (§2.7's laws, law 4)."
* §7.1's outcome table, the undo row (l. 11306): "an `undo` or `redo` whose target has dependent live events (§7.4
  *Independence*)" → "an `undo` or `redo` whose target has dependent live events (§7.4 *Independence*; among them each
  later live event whose structure its exact inverse or re-application would meet where §2.7's laws would not then
  hold, §2.7's laws, law 4)".
A lock's part of the dependence is J150's and is not written. The bar is S10.

**D3 · VF7v-HND-03 (FIX)** —
* §7.1 *Raised ways* (l. 11145–11146): "— in a held wall too, the fate *reshaped* (§2.7's laws, law 2 *Carried way*, law
  4's (G2)) —" → "— in a placement-locked wall too, the fate *reshaped*, and in a shape-locked one none, the way
  re-routed through the nearest gate of that wall a way of its class may pass, else refused (§2.7's laws, law 2 *Carried
  way*, law 1 (10), law 4's (G2)) —"; and (l. 11148–11149) "(item 363; §2.7's laws, law 1 (2), (5), (6); law 2 (a),
  (c);" → "(item 363; §2.7's laws, law 1 (2), (5), (6), (10); law 2 (a), (c);".
* §7.1's `bend.wall.raisedCrossing` row (l. 11338): "a held one's the fate *reshaped*, law 4's (G2)" → "a
  placement-locked one's the fate *reshaped*, law 4's (G2)".
V09's half is V9-3.

**D4 · VF7v-HND-04 (FIX)** — §5.2's F-WALL row, its ladder cell (l. 9852): "a hand op that runs F-WALL — a hand
`contractWall`, a terrain stroke's cliff re-anchor — is refused `refuse.raised.meeting` once its own re-pull fails, never
a stage left unwalled (§2.7's laws, law 2 (c))" → "a hand op that runs F-WALL — a hand `contractWall`, a terrain
stroke's cliff re-anchor — takes no rung of it: it is refused `refuse.raised.meeting` once its own pull, within its own
search band, finds no lawful shape, its band never widened and never a stage left unwalled (§2.7's laws, law 2 (a),
(c))". The example's half is M7.

**D5 · END for VF7v-EPO-04** —
* §5.2's F-WALL row, its detection (l. 9852): "a held building's widened strip it cannot keep clear, or a carried way" →
  "a held building's widened strip or a shape-locked raised way's `vault`-use span's strip it cannot keep clear, or a
  carried way"; and "(§2.7's laws, law 2 (c), law 1 (6), (9), law 2 *Carried way*;" → "(§2.7's laws, law 2 (c), law 1
  (6), (9), (10), law 2 *Carried way*;".
* §5.2's F-REDERIVE row, its detection (l. 9869): "or a held building's widened strip it cannot keep clear (§2.7's laws,
  law 2 (c), law 1 (6), (9);" → "or a held building's widened strip or a shape-locked raised way's `vault`-use span's
  strip it cannot keep clear (§2.7's laws, law 2 (c), law 1 (6), (9), (10);".

**D6 · END for VF7v-HND-05** — §7.1's `bend.wall.raisedCrossing` row (l. 11338):
* its cause: after "or a `placeGate` or a gate's slid crossing where §2.7's laws bar a gate there (law 1 (5))," insert
  " or a castle sited or resized by hand (`setAttr(castle, 'site' \| 'baileyArea')`) whose claim §2.7's laws bar there
  (law 1 (6)),", the cell's `\|` the design text's `|` as the refuse row writes it (l. 11339);
* its outcome: after "its stub or way following, the trace unchanged;" insert " a castle's claim moved whole to the
  nearest lawful site, or its bailey to the nearest lawful area, measured back along the drag (§2.7's laws, law 2 (a),
  law 3; its worked example the fixed-place sentence);".
V09's line is V9-1.

### rendering (base §8, §9, §11, §12)

Writes VF7v-RDR-01 (its FIX). The draw order of a raised deck has one home, §8.2's slot table; V01's neighbourhood list
cites it (V1-2).

**R1 · VF7v-RDR-01 (FIX)** —
* §8.2's layer-order table, row 14 (l. 14147): "| 14 | piers and bridges; raised decks (`raisedWay`), on the vector rung
  their shadows drawn in a derived pass just before this slot over everything below, roofs included | MFCG: piers; a
  deck may stand above the roofs beside it |" → "| 14 | piers and bridges | MFCG: piers |"; and after the row "| 19 |
  towers and gate blocks | MFCG: towers |" insert the row "| 19a | raised decks (`raisedWay`), on the vector rung their
  shadows drawn in a derived pass just before this slot over everything below, roofs, walls, towers and gate blocks
  included | new: drawn above what it crosses (§4.3; item 110 (b)) — a deck may stand above the roofs beside it, and a
  wall running beneath it (under a road deck's span or an aqueduct's arch, or with an aqueduct merged into it) and a
  gate, postern or tower under an aqueduct's arch that clears it draw beneath it (§2.7's laws, law 1 (2), (3), (5)); every
  other list that places raised decks cites this slot |".
* §8.2's *Slot resolution* (l. 14176–14177): "exact pier, bridge-deck and raised-deck entries in slot 14 outranking the
  prefix" → "exact pier and bridge-deck entries in slot 14 and the raised-deck entry in slot 19a outranking the prefix".
* §8.2's presets table, the `hatched` row (l. 14198): "raised decks in slot 14 with their shadow pass before it" →
  "raised decks in slot 19a with their shadow pass before it".
* §8.3, the item-110 marks row (l. 14307): "every raised deck over the ways it crosses (0 junction marks where they
  cross) with its piers in slot 12" → "every raised deck over the ways, walls, towers and gate blocks it crosses (0
  junction marks where they cross; its slot 19a) with its piers in slot 12".
(The finding's words for the table, the resolution and the preset; the census line is this file's: the readers lens
found no bar on a wall beneath a deck, and §8.3's draw-order row already asserts the slot order the new row sets. The
readers lens's held note on fields, trees and boundary treatments over decks closes with this row.)

### scope (base §0–§1, §13–§17, the index, INDEX.md)

Writes the class rule (S0), VF7-TST-01, VF7v-TST-01 – -03, VF7-TST-11, VF7v-TST-05, VF7v-TST-06 and VF7v-EPO-08 (its
FIXes); the ENDs of VF7v-EPO-01 and VF7v-HND-02; and the class's members C1 and C3 – C9. S1, S7, S10 and S11's C1, C3 –
C5 edit different words of T110-2 (4); S4 and S11's C6, C7 different words of T110-2 (6); S5, S8 and S11's C9 different
words of T110-4.

**S0 · the class ruling** — §13.2, T110-2's lead (l. 19235–19237): after "every count below of way corridors over a
support ring or a `vault` span's strip reading standing rings and `vault` spans as the crossing table's *beneath* reads
them (§2.7's laws, law 1 (8));" insert " every clause of T110-1, T110-2 and T110-4, and every volume bar that takes one
of them or cites §2.7's laws, asserting the outcome those laws give its fixture — a place a stroke, a drag or a costless
rule sets where law 3 picks it, a pulled, cost-field or searched op's where its own cost does (law 2 (a)), an aqueduct's
crossing in the form its level there gives (law 1 (2)), a chamber laid again only once nothing lies across its span's
strip (law 1 (8)), and a fixture's state as the epoch's own step order leaves it at the clause's op (V06 §3.2) —,
naming a particular place, form, chamber or state only where its fixture's stated geometry fixes it (its seed searched
so where the clause says so), and, where a clause's words and that outcome differ, the bar asserting the outcome;".

**S1 · VF7-TST-01 (FIX)** — T110-2 (4) (l. 19389–19392): "and one across a viaduct's ramp nearer its foot than the deck's
first lawful crossing — bent beyond its foot through a gate on the carried way's ground course —, and, on a second run,
one across that ramp nearer the deck — bent under the deck's first span clear of the ramp" → "and one across a
viaduct's ramp nearer the first point beyond its foot than the deck's first lawful crossing, each measured along the
deck line (§2.7's laws, law 3) — bent beyond its foot through a gate on the carried way's ground course —, and, on a
second run, one across that ramp nearer the deck's first lawful crossing than the first point beyond its foot — bent to
that crossing, under the deck's first span or at a support clear of the ramp". (The finding's words, save "bent under
the deck's first span clear of the ramp": a road deck's lawful crossing may lie at a support, the band laid through it,
law 1 (3), so naming the span alone would pin a form the laws choose — S0.)

**S2 · VF7v-TST-01 (FIX)** — T110-2 (1) (l. 19303–19306): "its course bent to the nearest crossing whose span clears the
wall's top, with `bend.wall.aqueductArch`, else refused `refuse.raised.meeting` (§2.7's laws, law 1 (2), law 2 (a),
(c))" → "its course bent to the nearest crossing law 3 picks in a form its level there gives — over, under a span that
clears the wall's top, or merged, where its channel runs within the wall's height —, with `bend.wall.aqueductArch` in
that form, else refused `refuse.raised.meeting` (§2.7's laws, law 1 (2), law 2 (a), (c), law 3)".

**S3 · VF7v-TST-02 (FIX)** — T110-2 (8) (l. 19555–19557): "the ring road crossing under it by the crossing rule, and a
hand `delete` of the intervallum then laying the chamber again with its id" → "the ring road crossing under it by the
crossing rule, a hand `delete` of the intervallum leaving the span read `open` while the ring road lies across its
strip, and a hand `delete` of the ring road then laying the chamber again with its id (§2.7's laws, law 1 (8); its
worked example *beneath*)".

**S4 · VF7v-TST-03 (FIX; VF7v-GEN-04's END decided here)** — T110-2 (6) (l. 19528–19530): "and, on a third run whose seed
is searched so that §2.7's laws admit no gate for that way where the boundary crosses its ground course, the way
re-routed by law 2 (b)" → "and, on a third run whose seed is searched so that §2.7's laws admit no gate for that way
where the boundary crosses its ground course nor at any point of that way within the pull's search band, where law 2
(a) would move it (§4.4 S5a *Trace* (2)), the way re-routed by law 2 (b)". (One text for the two findings: VF7v-GEN-04's
"nor at any point of that way within the pull's search band", which names the bound P4 and S5a give, rather than
VF7v-TST-03's "within the trace's reach".)

**S5 · VF7-TST-11 (FIX)** — T110-4 (c) (l. 19574–19575): "— the shape-locked runs from the milestone that carries the
shape lock, J147, J150) and a village rung —" → "— the shape-locked runs from the milestone that carries the shape lock,
J147, J150) and a village rung holding a declared viaduct and aqueduct, one of them placement-locked —".

**S6 · VF7v-TST-05 (FIX)** —
* §13.2's runs sentence (l. 19602–19604): "and (1)'s founding across a decayed ring and (2)'s founded viaduct across a
  standing ring (T-V6-73)" → "and (1)'s foundings across a decayed ring and across a ring and a retaining wall drawn by
  hand and placement-locked, and (2)'s founded viaduct across a standing ring, its epoch route through a standing gate
  and its epoch walled stage's spawned primary (T-V6-73)";
* the take-over row (l. 19850): "T110-2 (1)'s founding across a decayed ring and (2)'s founded viaduct across a standing
  ring (T-V6-73)" → "T110-2 (1)'s foundings across a decayed ring and across a ring and a retaining wall drawn by hand
  and placement-locked, and (2)'s founded viaduct across a standing ring, its epoch route through a standing gate and its
  epoch walled stage's spawned primary (T-V6-73)";
* §13.8's T110 row (l. 20431): "(1)'s and (2)'s foundings," → "(1)'s and (2)'s foundings, (2)'s epoch route and walled
  stage,".
V06's half is V6-7.

**S7 · VF7v-TST-06 (FIX) with C2** — T110-2 (4) (l. 19419–19420): "an epoch circuit across a standing aqueduct whose
`vault` span holds an arch vault the user placement-locked — the circuit crossing under that span," → "an epoch circuit
across a standing aqueduct whose `vault` span holds an arch vault the user placement-locked (the fixture's seed searched
so that the circuit's line crosses the deck line under that span and no way, square or channel — an intervallum among
them — is laid across that span's strip while a wall of this clause stands over it; §2.7's laws, law 1 (8), law 2 (a))
— the circuit crossing under that span,". (The finding's seed condition placed once at the fixture, so that it holds for
the circuit's re-lay, "the same by a hand `drawWall`" and its re-lay after; with C2's condition on the circuit's place.)
V04's two clauses are V4-1.

**S8 · VF7v-EPO-08 (FIX)** — T110-4 (a) (l. 19565–19566): "T-V6-48 (with a declared viaduct over its harbour mouth)" →
"T-V6-48 (with a declared viaduct along its harbour's shore whose fixed-place zone holds a head of its harbour mouth
before the chain is laid, its course kept off the basin and the mouth by §4.3 *Where it may not go*)".

**S9 · END for VF7v-EPO-01** — T110-2 (1) (l. 19291–19292): "the same aqueduct founded by V06 §3.19 at a CITY epoch across
the ring where its run is `breached` and, on a second run, `dismantled` —" → "the same aqueduct founded by V06 §3.19 at
a CITY epoch across the ring where its run is `breached` and, on a second run, `dismantled` (the ring placement-locked by
the script once its run is so, so that the epoch's `fortification` step, which runs before its `raisedWays` step,
repairs no run of it: V06 §3.1, §3.2, §3.7.5; a lock decides no meeting, §2.7's laws, law 2 *Entry*) —". (This file's
words, not the finding's threat script: V6-1's note.)

**S10 · END for VF7v-HND-02** — T110-2 (4) (l. 19385–19386): after "and a hand `delete` of a run beneath a standing
viaduct — the viaduct unchanged, no bend, the run back on its undo;" insert " on a variant whose standing aqueduct's
spans all read `open`, an owner's `undo(h, of)` of a hand `delete` of that aqueduct after a later hand `drawWall` through
where its supports stood, its channel there above the wall's top — refused `refuse.undo.dependent` naming the
`drawWall`, nothing restored (§2.7's laws, law 4);". (The finding's clause on the fixture PRB7D-LCK-17 found — spans all
`open`, so the touched sets are disjoint and only law 4's dependence refuses it; "its channel there above the wall's top"
fixes the over form, S0.)

**S11 · CLASS (C1, C3 – C9)** —
* C1, T110-2 (4) (l. 19388–19389): "where its channel runs above the wall's top, bent along the deck to cross under the
  nearest span that clears the wall," → "where its channel runs above the wall's top along the deck within the stroke's
  reach, bent along the deck to the nearest lawful crossing (law 3), under a span that clears the wall,".
* C3, T110-2 (4) (l. 19425–19426): "a hand `drawWall` across that span moved along the deck line to the nearest crossing
  clear of the building's widened strip," → "a hand `drawWall` across that span moved along the deck line to the nearest
  lawful crossing (law 3), clear of the building's widened strip and in the form the aqueduct's level there gives,".
* C4, T110-2 (4) (l. 19446): "the edit bent to the nearest course or spacing that keeps the line out of it," → "the edit
  bent to the nearest lawful course or spacing (law 3), which keeps the line out of it,".
* C5, T110-2 (4) (l. 19455–19456): "its channel there running above the ring's top (§2.7's laws, law 1 (2): over, never
  merged)" → "its channel running above the ring's top wherever the circuit's search band and the strokes' reach meet
  the aqueduct (§2.7's laws, law 1 (2): over, never merged)".
* C6, T110-2 (6) (l. 19502–19507): "its seed searched so that the new ring's boundary meets one of the aqueduct's
  supports — the trace crossing the deck line under a span, never at a support," → "its seed searched so that the new
  ring's boundary meets one of the aqueduct's supports where its channel runs above the ring's top — the trace crossing
  the deck line under a span, never at a support,"; and "and on (1)'s variant whose channel runs within the ring's height
  the crossing merged wherever the boundary meets the deck line" → "and on (1)'s variant the crossing merged wherever the
  boundary meets the deck line where its channel runs within the ring's height".
* C7, T110-2 (6) (l. 19512–19514): "New random's seed searched so that the new ring's boundary meets the `cleared`
  support's former ring and, on the `topple` run, the `ruined` stump — the trace through the cleared ring as open
  ground" → "New random's seed searched so that the new ring's trace crosses the deck line through the `cleared`
  support's former ring, both its fallen spans' recorded soffits clearing the ring's top, and, on the `topple` run, so
  that its boundary meets the `ruined` stump — the trace through the cleared ring as open ground (§2.7's laws, law 1 (2):
  every span above the band, standing or fallen, clearing its top)".
* C8, T110-2 (7) (l. 19540–19545): "an epoch circuit laid across the aqueduct after a span over its planned band fell
  `ruined` and after a support there was `cleared`, both its spans fallen first," → "an epoch circuit laid across the
  aqueduct after a span over its planned band fell `ruined` and after a support there was `cleared`, both its spans
  fallen first (their recorded soffits clearing the ring's top, the seed searched so that the circuit's line crosses the
  deck line through that support's former ring: §2.7's laws, law 1 (2)),"; and "an epoch contraction laid after a
  support by its planned line was `cleared`, both its spans fallen first," → "an epoch contraction laid after a support
  by its planned line was `cleared`, both its spans fallen first (their recorded soffits clearing the ring's top, the
  seed searched so that the contraction's line crosses the deck line through that support's former ring: §2.7's laws,
  law 1 (2)),".
* C9, T110-4 (a) (l. 19567–19568): "its seed searched so that the new ring's boundary meets one of the kept aqueduct's
  supports, the ring crossing the aqueduct merged there (its channel within the ring's height, a pier in the band)" →
  "its seed searched so that the new ring's trace crosses the kept aqueduct's deck line at one of its supports where its
  channel runs within the ring's height, the ring crossing the aqueduct merged there (a pier in the band)".

### V01

Writes VF7v-RDR-02 (its FIX) and the END of VF7v-RDR-01.

**V1-1 · VF7v-RDR-02 (FIX)** — V01 §3.17.3 (3) (V01 l. 2473): "(*Lattice and costs*; §2.7's way-and-channel table, row a)"
→ "(*Lattice and costs*; §2.7's laws, law 1 (1), (8); its worked example the way-and-channel table's row (a))".

**V1-2 · END for VF7v-RDR-01** —
* V01 §5.1.3's table (V01 l. 3024): "| 14 | piers and bridges; raised decks (`raisedWay`), their shadows drawn in a pass
  just before this slot over everything below, roofs included | a deck may stand above the roofs beside it |" → "| 14 |
  piers and bridges | — |"; and after "| 19 | towers and gate blocks | — |" insert "| 19a | raised decks (`raisedWay`),
  their shadows drawn in a pass just before this slot over everything below, roofs, walls, towers and gate blocks
  included | drawn above what it crosses, as §8.2's slot 19a, this order's one home, places it (item 110 (b)) |".
* V01 §5.1.2 (V01 l. 2976–2977): "a raised part's piers take slot 11 and its deck slot 14, its shadow by the prism law
  from the deck's height in the pass before slot 14" → "a raised part's piers take slot 11 and its deck slot 19a (§8.2's
  slot 19a), its shadow by the prism law from the deck's height in the pass before slot 19a".

### V02

No work.

### V03

No work.

### V04

**V4-1 · END for VF7v-TST-06, with C10** —
* T-V4-63 (V04 l. 3164): after "and the hand wall's delete laying it again with the same id" insert " (the fixture's seed
  searched so that no way, square or channel — an intervallum among them — is laid across that span's strip while the
  wall stands over it; §2.7's laws, law 1 (8))".
* T-V4-80 (i) (V04 l. 3181): "with, on a CITY fixture whose aqueduct's `vault` span holds a locked arch vault, an epoch
  circuit" → "with, on a CITY fixture whose aqueduct's `vault` span holds a locked arch vault (its seed searched so that
  the circuit's line crosses the deck line under that span and nothing but this clause's walls, its retaining stroke and
  its hand way — no intervallum, square or channel — is laid across that span's strip; §2.7's laws, law 1 (8), law 2
  (a)), an epoch circuit"; and "the hand `drawWall` moved along the deck line to the nearest crossing clear of the
  building's widened strip (§2.7's laws, law 1 (2), (9), law 3)" → "the hand `drawWall` moved along the deck line to the
  nearest lawful crossing, clear of the building's widened strip and in the form the aqueduct's level there gives
  (§2.7's laws, law 1 (2), (9), law 3)".
(For T-V4-80 (i) the finding's seed condition is placed once at the fixture, so that it covers the wall's delete, the
retaining stroke's and the hand way's, and names the hand way the clause lays on purpose.)

### V05

No work.

### V06

Writes VF7v-EPO-01, VF7-RDR-02 (VF7v-EPO-02 merged), VF7v-EPO-04, VF7v-EPO-05, VF7v-EPO-07 and VF7v-TST-04 (its FIXes);
the END of VF7v-TST-05; the class's C11 and C12. V6-1 and V6-7 edit different words of §7's founding row; V6-1 and V6-7
different words of T-V6-73.

**V6-1 · VF7v-EPO-01 (FIX)** —
* T-V6-73 (V06 l. 4246): "(by a hand `convert` the fixture logs before that epoch)" → "(by a hand `convert` the fixture
  logs before that epoch, the ring then placement-locked by the script so that the epoch's `fortification` step, which
  runs before its `raisedWays` step, repairs no run of it: V06 §3.1, §3.2, §3.7.5; §2.7's laws, law 2 *Entry*: a lock
  decides no meeting)".
* §7's T110-2 founding row (V06 l. 4164): "where the run at its course is `breached` and, on a second run, `dismantled`"
  → "where the run at its course is `breached` and, on a second run, `dismantled` (the ring placement-locked by the
  script once its run is so, V06 §3.7.5)".
(Not the finding's "the site's threat scripted below `walls.threatMin` from the fixture's start through that epoch":
V06 §3.7.5's in-use repair fires while the threat exceeds `walls.neglectThreatMax`, so a threat below `threatMin` need
not stop it, and a low threat from the start may stop the circuits H-AQUA's other clauses need. The lock is the device
the state sweep and T110-2 (7) already use — "a locked or pinned ring is held (V06 §3.1)", §3.7.5 — and a placement lock
decides no meeting, so the founding meets the ring as the clause asserts. The base's half is S9.)

**V6-2 · VF7-RDR-02 (FIX; VF7v-EPO-02 merged)** — V06 §3.2, *The arch-vault reconcile's place*:
* (V06 l. 1041): "a chamber for each standing `vault` span that §2.7's laws read `vault`" → "the chamber V04 §3.5.4 (d)
  (1) lays in each standing `vault` span that §2.7's laws read `vault`";
* (V06 l. 1048–1049): "and that every `vault` span they read `vault` has its chamber (`collapsed` where V04 §3.5.4 (d)
  (2) says)," → "and that every `vault` span they read `vault` has the chamber V04 §3.5.4 (d) lays (law 1 (8)),".
(VF7-RDR-02's words for the second site, a citation rather than VF7v-EPO-02's restatement; VF7v-EPO-02's first site
added.) The pipeline's half is P7.

**V6-3 · VF7v-EPO-04 (FIX)** — V06 §3.7.1's `t_k` rule (V06 l. 1471): "— never a held building's strip, which the trace
keeps clear (law 1 (9))" → "— never a held building's strip or a shape-locked raised way's `vault`-use span's strip,
which the trace keeps clear (law 1 (9), (10))". V07's half is V7-2; §5.2's is D5.

**V6-4 · VF7v-EPO-05 (FIX)** —
* V06 §3.19 (5) (V06 l. 2851–2852): "and meets a standing curtain — locked, pinned, declared or not," → "and meets a
  standing curtain — placement-locked, pinned, declared or not,";
* (V06 l. 2856–2857): "merged where its channel runs within the wall's height (law 1 (2)) —," → "merged where its
  channel runs within the wall's height, a shape-locked curtain never merged into (law 1 (2), (10)) —,";
* (V06 l. 2859–2860): "founded with its two ends fixed, so not founded where its course would cross a standing curtain:"
  → "founded with its two ends fixed, so not founded where its course would cross a standing curtain or a curtain's line,
  band or wall strips would lie over an end of it (law 1 (4)):";
* §2.10's `raised.waited` comment (V06 l. 770): "no course keeps lawful against a standing trace's gates, posterns,
  towers or fixed places (law 1 (4)–(6), law 2 (c);" → "no course keeps lawful against a standing trace's line, band and
  wall strips, gates, posterns, towers or fixed places (law 1 (2), (4)–(6), (10), law 2 (c);".

**V6-5 · VF7v-EPO-07 (FIX)** —
* V06 §3.7.6 (5)'s lead (V06 l. 1601–1603): "Every trace this section makes — a circuit, a shorter ring, a re-anchored or
  repaired stretch, the waterfront's quay wall — meets the standing raised ways by §2.7's laws" → "Every trace this
  section makes — a circuit, a shorter ring, a re-anchored or repaired stretch, the waterfront's quay wall — and (3)'s
  harbour-mouth chain meet the standing raised ways by §2.7's laws";
* V06 §3.7.6 (3)'s chain bullet (V06 l. 1582–1583): after "a tower is added only at a head where none stands" add "; its
  gate and towers stand only where §2.7's laws, law 1 (5) and (6), admit them — at the nearest heads or shore points
  along the entrance that do, a tower standing where law 1 (6) bars a fixed place being no anchor, else the chain
  waiting (`walls.waited`; law 2 (a), (c); its worked example the fixed-place sentence)";
* §2.10's `walls.waited` comment (V06 l. 755): "and traces that no lawful crossing of a standing raised way or clear point
  for a fixed place admits" → "and traces and harbour-mouth chains (V06 §3.7.6 (3)) that no lawful crossing of a standing
  raised way or clear point for a fixed place admits".
("a tower standing where law 1 (6) bars a fixed place" for the finding's "a standing tower barred there": a standing
tower is Tier 1 and barred from nothing; it is barred only as the chain's anchor.)

**V6-6 · VF7v-TST-04 (FIX)** — V06 §8:
* the E3 cell (V06 l. 4281): "the state sweep's `topple` runs of T-V6-11, T-V6-47 and T-V6-73 at E5, which builds the
  hazards)" → "the state sweep's `topple` runs of T-V6-11, T-V6-47 and T-V6-73, and T-V6-47's epoch `shiftCourse` clause
  (T110-2 (4)'s), at E5, which builds the hazards and the terrain candidates)";
* the E5 cell (V06 l. 4283): "the state sweep's `topple` runs of T-V6-11, T-V6-47 and T-V6-73" → "the state sweep's
  `topple` runs of T-V6-11, T-V6-47 and T-V6-73; T-V6-47's epoch `shiftCourse` clause".

**V6-7 · END for VF7v-TST-05** —
* §7's T110-2 founding row (V06 l. 4164), at the end of its last cell, add "; and the founding across a retaining wall
  drawn by hand and placement-locked, (2)'s epoch route through a standing gate and its epoch walled stage's spawned
  primary, as T110-2 (1) and (2) state them";
* T-V6-73's head (V06 l. 4246): "and T110-2 (1)'s founding across a decayed ring and (2)'s founded viaduct across a
  standing ring)" → "and T110-2 (1)'s foundings across a decayed ring and across a ring and a retaining wall drawn by
  hand and placement-locked, and (2)'s founded viaduct across a standing ring, its epoch route through a standing gate
  and its epoch walled stage's spawned primary)". (This file's addition: the bar's own head states the same take-over
  as §7's row and the base's runs sentence, S6.)

**V6-8 · CLASS (C11, C12)** —
* C11, T-V6-47 (V06 l. 4220), the restated T110-2 (7) clause: "an epoch circuit laid across the aqueduct after a span
  over its planned band fell `ruined` and after a support there was `cleared`, both its spans fallen first (the aqueduct
  then locked by the script" → "an epoch circuit laid across the aqueduct after a span over its planned band fell
  `ruined` and after a support there was `cleared`, both its spans fallen first and their recorded soffits clearing the
  ring's top, the seed searched so that the circuit's line crosses the deck line through that support's former ring
  (§2.7's laws, law 1 (2)) (the aqueduct then locked by the script"; and "an epoch contraction laid after a support by
  its planned line was `cleared`, both its spans fallen first — the trace through its former ring" → "an epoch
  contraction laid after a support by its planned line was `cleared`, both its spans fallen first and their recorded
  soffits clearing the ring's top, the seed searched so that the contraction's line crosses the deck line through that
  support's former ring — the trace through its former ring".
* C12, T-V6-11 (V06 l. 4184): "and an aqueduct founded by V06 §3.19 across the absorbed ring's line while a `breached`
  run there stands" → "and an aqueduct founded by V06 §3.19 across the absorbed ring's line while a `breached` run there
  stands as the epoch's `raisedWays` step reads it (V06 §3.2, §3.19 (2))".

### V07

Writes VF7v-EPO-03 (its FIX), the END of VF7v-EPO-04 and the class's C13.

**V7-1 · VF7v-EPO-03 (FIX)** — T-V7-48 (V07 l. 3710): "the ring road by §2.7's way-and-channel table (row c)" → "the ring
road by §2.7's laws (law 1 (1), (8); its worked example the way-and-channel table's row (c))".

**V7-2 · END for VF7v-EPO-04** — V07 §3.13's F-V-RAISED detection (V07 l. 2770): "or a held building's widened strip it
cannot keep clear (§2.7's laws, law 2 (c);" → "or a held building's widened strip or a shape-locked raised way's
`vault`-use span's strip it cannot keep clear (§2.7's laws, law 2 (c), law 1 (9), (10);".

**V7-3 · CLASS (C13)** — T-V7-48 (V07 l. 3710):
* "its line — planned across a standing support of the declared aqueduct whose channel there runs above the palisade's
  top — bent locally to cross under the nearest span clearing that top (§2.7's laws, law 1 (2), law 2 (a), law 3)" →
  "its line — planned across a standing support of the declared aqueduct whose channel runs above the palisade's top
  along the deck within the line's reach — bent locally to the nearest lawful crossing, under a span clearing that top
  (§2.7's laws, law 1 (2), law 2 (a), law 3)";
* "a palisade stretch T3 `wall` draws across it at a standing support, its channel there above the palisade's top, bent
  locally to cross under its nearest span clearing that top" → "a palisade stretch T3 `wall` draws across it at a
  standing support, its channel above the palisade's top along the deck within the stroke's reach, bent locally to the
  nearest lawful crossing, under a span clearing that top".

### V08

No work.

### V09

Writes VF7v-HND-05 and VF7v-RDR-03 (its FIXes), the END of VF7v-HND-03 and the class's C14.

**V9-1 · VF7v-HND-05 (FIX)** — V09 §4.9's `bend.wall.raisedCrossing` (V09 l. 2104):
* its line cell: after its fixed-place form "for a fixed place moved, "The {anchor \| water gate} keeps clear of {way},
  {m} m along the {edge}."" add " — and, for a castle moved or resized by hand clear of {way}, "The castle keeps clear of
  {way}, {m} m from where you put it."";
* its source cell: after "or a `placeGate` or a gate's slid crossing inside its under-deck strip where no gate may stand
  (law 1 (5))," insert " or a castle sited or resized by hand (§2.7's laws, law 1 (6), law 2 (a), law 3; its worked
  example the fixed-place sentence),".
(The finding's words, its source-cell citation written by Part H's head.) §7.1's row is D6.

**V9-2 · VF7v-RDR-03 (FIX)** — T-V9-61 (V09 l. 4437): "appears in each format as file f item 447 (a)–(d) state" →
"appears in each format as §11.1's rows state (file f item 447; a span's `use` as §2.7's laws read it, law 1 (8); its
worked example *beneath*)".

**V9-3 · END for VF7v-HND-03** —
* §4.20.2 (4) (V09 l. 3019): "an aqueduct drawn across a standing wall, held or not, crosses it" → "an aqueduct drawn
  across a standing wall, placement-locked or not, crosses it";
* (V09 l. 3033–3034): "each the same with either side locked, pinned or neither, a held thing's change shown as the fate
  *reshaped*" → "each the same with either side placement-locked, pinned or neither, a placement-locked thing's change
  shown as the fate *reshaped* (a shape-locked one's never made: §2.7's laws, law 1 (10))";
* §5.5 (V09 l. 3962): "reshapes a locked one" → "reshapes a placement-locked one".

**V9-4 · CLASS (C14)** — T-V9-52 (V09 l. 4428): "a stroke whose channel there runs above the wall's top over it on one
of its arches" → "a stroke whose channel there runs above the wall's top by more than the deck's depth
(`raisedWays.structure.span.deckDepthCm`) over it on one of its arches".

### V10

**V10-1 · VF7v-RDR-04 (FIX)** — T-V10-41 (V10 l. 3156): "with nothing but that run across the span's strip (§2.7's laws,
law 1 (8))" → "with nothing but that run across the span's strip and the span's inset rectangle at least `minEdge` on each
side (§2.7's laws, law 1 (8); V04 §3.5.4 (d) (1))".

### V11

No work.

### V12

No work.

## Builders' choices for fix-list.md

* **VF7v-TBL-04** — §2.7's laws, law 1 (5)'s "never on a support's ring": read of every support (a gate, postern or tower
  never on a `cleared` support's ring, moved along the trace to the nearest lawful point, law 2 (a), law 3) or of a
  standing one (a `cleared` ring open ground, the footprint lawful there in an over crossing whose spans clear it); the
  builder picks one.
* **VF7v-TBL-05** — §2.7's crossing table, row W14 at an epoch: a run re-sectioned on a trace older than the raised way it
  crosses — each crossing counted in `walls.raisedCrossings` at the re-section's epoch (W14; V06 §2.10's "laid or
  re-sectioned"), or counted only where the run was laid after the raised way (*Reported*); the builder picks one.
* **VF7v-GEN-05** — base §4.2 S3 (7): a gate route whose pick no route crosses `T = t_1` from where §2.7's laws admit a
  gate — F-ROUTE's last rung, its search still over lawful first points (a gate beside the strip, the route ending at the
  nearest reachable junction, unserved and reported), or the pick re-drawn as a pick on a closed arc is (≤ 3 attempts,
  then dropped and reported; §2.7's laws, law 2 (a), (c)); the builder picks one.
* **VF7v-EPO-06** — V06 §3.19 (2): an elevated road's non-citadel anchor whose end would lie under an enclosing wall's
  line, band or wall strips — the candidate waits (`raised.waited`, its ends fixed), or the anchor is the highest part-0
  way vertex at which the road's ends keep clear of them, as the citadel's anchor is (§2.7's laws, law 1 (4), law 2 (a),
  (c)); the builder picks one.
* **VF7v-RDR-05** — V09 §4.9's `bend.wall.aqueductArch` for one aqueduct stroke crossing several walls whose levels give
  different forms (over one, merged into another): one line per wall in its form, or one line in the first wall's form
  with the rest among the dry run's effects; the builder picks one.

## Held for the next full round

Outside the family; never graded here (the checks' held notes, each with its site; the last is this file's sweep's).

1. (epochs) V07 §3.5a (5) (V07 l. 1635–1642) × (7) (V07 l. 1650–1651) × §2.7's support step (6)'s lead (l. 2575–2578):
   (5) lets crofts, closes and paddocks pass beneath a deck and lays a toft slot meeting the strip as a close, while (7)
   holds no plot in the strip inside the perimeter and (6) makes each `vault` span's strip a reservation — a plot under a
   `vault` span (raised way × plots).
2. (epochs) V06 §3.11.6 (V06 l. 2173–2182) and II.7.6's `raiseGrade` (l. 22798–22808): no text says what a raised region
   does to an enceinte run or a raised way standing in it — a run's base and top, a pier's height, a span's headroom and
   its vault's ceiling, which law 1 (2), (7) and the span rule read (wall × terrain, raised way × terrain).
3. (hand) Base §7.3 (b) 3 (l. 11689–11690): "it cuts every other way the new channel ⊕ bank setback meets" names no
   exception for a raised way whose deck passes over a moved river's new channel, where a carve keeps it by the
   way-and-channel table's row (e) (§4.11, l. 8951) — raised way × water.
4. (readers) V04 l. 2892 (§5.5's CityJSON row) × base §11.1's CityJSON row (l. 16720): V04 exports a
   `TunnelHollowSpace` per chamber of each system's `Tunnel` (an arch vault a `vaults` chamber) while §11.1 makes an arch
   vault a `BridgeRoom` of its raised way's `Bridge` — two objects, or two forms, for one chamber.
5. (readers) V04 l. 222–223 and l. 2727–2728 × base §8.2's `raisedWay` program (l. 13550–13553): V04 leaves the vault's
   infill wall and door on the ground view to the base's drawing, which draws no infill wall or door.
6. (readers) Base §8.2's layer order (l. 14147–14151) and V01 §5.1.3 (V01 l. 3024–3027): fields, trees and boundary
   treatments drawn over raised decks — closed by R1 and V1-2 as written (slot 19a); kept here only so that the next
   full round confirms it.
7. (readers) `adjudication-r7v.md`'s held notes 5–7 persist (V09 l. 3258's `spans/<n>`; T-V9-58's fixture, V09 l. 4434;
   §4.5's and §8.4's casters on a `breached` or `dismantled` run, l. 6885, 14403–14404, 14628–14629): the casters read
   "each run at its top as §2.7's laws give it" while the laws' *wall's top* is "whatever its runs' condition", so a gap
   casts at its section's top unless the readers' drawing is read into it.
8. (tests) V09 T-V9-52 (V09 l. 4428): "a road drawn across a viaduct crosses under its nearest `open` span … with
   `bend.raised.underSpan`", where row (b) moves it "to cross under the nearest span that admits it" by §4.3's crossing
   rule; on a viaduct whose nearest `open` span is too narrow or low for the road the bar fails a correct build — a raised
   way meeting a ground way, no wall.
9. (tests) V07 §3.12 item 7 (V07 l. 2627) and T-V7-51 (V07 l. 3713): "crosses held" means carried unchanged, while §2.7's
   *held* now means locked and the support step's (6) says "kept" — a rung hand-off, no wall meeting.
10. (this file's sweep) Base §13.2 T110-2 (6) (l. 19501): "that route re-solved to cross under the nearest span the rule
    admits" pins the span a route re-solve's own cost chooses (§4.3), as item 8 pins a stroke's — a raised way meeting a
    ground way, no wall.
11. `adjudication-r7v.md`'s held notes 1–4, 8 and 9 stand as written there (the generation lens: "None new … the held list
    stands").
