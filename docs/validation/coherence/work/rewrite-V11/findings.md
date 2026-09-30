### VOL-V11-V12-RESTATEMENTS-001 [restatements; None]
the unit list m, m2, ha, cm, cdeg, share, weight, people, yr, wk, m3, lvl with its additions
REQUIRED: state it once at base §2.1 (units); every other place cites it
CLOSURE: FIX at the unit

### VOL-V11-V12-RESTATEMENTS-002 [restatements; None]
clamp-to-bound on an out-of-range edit with the one-line message; also V11-0280, V11-0486
REQUIRED: state it once at base §7.1 (item 101 R2), §5.2 F-EDIT; every other place cites it
CLOSURE: FIX at the unit

### VOL-V11-V12-RESTATEMENTS-003 [restatements; None]
the compiled cell shape {value, unit, provenance {source, date, note, evidence?}}
REQUIRED: state it once at base §7.6 (cells); every other place cites it
CLOSURE: FIX at the unit

### VOL-V11-V12-RESTATEMENTS-004 [restatements; None]
preset resolution: own entry, else 0 or off for an extension cell, else the default
REQUIRED: state it once at base §7.6 (resolution order); every other place cites it
CLOSURE: FIX at the unit

### VOL-V11-V12-RESTATEMENTS-005 [restatements; None]
the bend cells 15 m, 12 m, 0.8 given as V09's constants in the lifecycle migrate cell
REQUIRED: state it once at V11 §3.24.1 rows (from V09 §4.20.1 (3)); every other place cites it
CLOSURE: FIX at the unit

### VOL-V11-V12-RESTATEMENTS-006 [restatements; None]
the list-hit rule (five or more words of one reference list on a line or column fails unless an allow row is reviewed)
REQUIRED: state it once at base §17.1 (5); every other place cites it
CLOSURE: FIX at the unit

### VOL-V11-V12-RESTATEMENTS-007 [restatements; None]
v.parish_church crypt cells (cellar chance 0.1, cryptM2 20/25/35/45) and v.chapel never, while saying cited not restated
REQUIRED: state it once at V07 §2.4 (J-V7.64); every other place cites it
CLOSURE: FIX at the unit

### VOL-V11-V12-RESTATEMENTS-008 [restatements; None]
undergroundAccess.prob defaults (0.15-0.30 lodging and works families, 0.02 housing, 0 barracks, courthouse, temple)
REQUIRED: state it once at V11 §3.5.1 (restated in base §10.2 prose); every other place cites it
CLOSURE: FIX at the unit

### VOL-V11-V12-RESTATEMENTS-009 [restatements; None]
the underground content rows' values, carried in V04 until its next revision (X-V11-4)
REQUIRED: state it once at V11 §3.23 (restated in V04's defaults table); every other place cites it
CLOSURE: FIX at the unit

### VOL-V11-V12-RESTATEMENTS-010 [restatements; None]
the bend cells' calibration milestone, stated as M3a (V12: panel M4-110 at M4)
REQUIRED: state it once at V12 §3.11 register line 21; every other place cites it
CLOSURE: FIX at the unit

### V11-RESTATE-1 [restatement_findings; minor]
The unit list restates the base's units (§2.1) with additions (share, weight, people, yr, wk, m3, lvl, cdeg); it cites the base but re-lists; the new units (lvl, weight as score unit) need one home.
REQUIRED: Cite §2.1 for the base units; state only V11's added units (weight, lvl) here, or move the full enumeration into §2.1 by BCR.
CLOSURE: elegance ruling (E-list)

### V11-RESTATE-2 [restatement_findings; minor]
The clamp-on-edit rule (item 101 R2, F-EDIT) and the compiled cell shape {value, unit, provenance {source, date, note, evidence?}, ...} are base facts (§7.1/§7.6, §5.2) restated in V11's type comments.
REQUIRED: Cite §7.6 (cell shape) and §7.1 / item 101 R2 (clamp) instead of restating.
CLOSURE: FIX at the unit

### V11-RESTATE-3 [restatement_findings; minor]
The migration defaults of the three bend cells are given as '15 m, 12 m, 0.8 (V09's constants)', restating V09's values; §3.24.1 writes the rows' values (check they agree) - two statements of one fact.
REQUIRED: Cite §3.24.1's TOWN row values (the one home) rather than restating numbers attributed to V09.
CLOSURE: FIX at the unit

### V11-RESTATE-4 [restatement_findings; minor]
The clean-room list-hit rule ('five or more words of one reference list on one line or in one column fails the PR unless an allow row ... is reviewed') restates base §17.1 (5)'s scan definition (ARCHITECTURE lines ~15016-15066).
REQUIRED: Cite §17.1 (5) for the scan and its hit rule; keep only the content-specific points (P-id on ref rows, SF words not a reference list).
CLOSURE: FIX at the unit

### V11-RESTATE-5 [restatement_findings; minor]
Says V07's village crypt cells are 'cited, not restated' but restates them (v.parish_church basement, 0.1, cryptM2 20/25/35/45; v.chapel never) - values agree with V07 line 1055 today, but a second statement of V07-owned values.
REQUIRED: Replace the values by a pointer to V07 §2.4 / §3.x's crypt cells.
CLOSURE: FIX at the unit

### V11-RESTATE-6 [restatement_findings; minor]
V04's defaults table restates V11 §3.23's values (two homes for one fact) and the text leaves the fix 'until its next revision' - a hand-off (X-V11-4) not yet closed at its destination and deferral-shaped wording.
REQUIRED: Close X-V11-4 in this pass: V04's defaults table cites V11 §3.23 for these cells (verify at V04's inventory), and drop the 'until' clause here.
CLOSURE: FIX at the unit

### V11-RESTATE-7 [restatement_findings; minor]
The base's §10.2 prose states the undergroundAccess.prob defaults (higher for breweries, bathhouses, warehouses, inns, 0.15-0.30 by band; houses 0.02 raised by the age term; 0 for barracks, courthouse, temple) and V11 §3.5.1 writes the same values as table rows: two homes for one set of values.
REQUIRED: Base §10.2 cites V11 §3.5.1's rows (the table is V11's), dropping its numbers.
CLOSURE: FIX at the unit

### V11-DUP-1 [internal_duplications; minor]
The T-V11-5 rule (a compiled profile fails only when it emits and is sensitive to one nuisance both at level 2 or more) is stated in §3.3.2 and again in §3.5.2, whose bullet claims to state it once.
REQUIRED: Keep one statement (§3.3.2) and reference it from §3.5.2.
CLOSURE: FIX at the unit

### V11-DUP-2 [internal_duplications; minor]
The singular->neutral / district-defining->cluster competition override is stated three times in V11.
REQUIRED: State it once (§2.3) and cite it from step 5a and §3.5.2.
CLOSURE: FIX at the unit

### V11-DUP-3 [internal_duplications; minor]
The clamp-and-one-line-note / F-EDIT refusal rule appears three times in V11 (and is a base rule, item 101 R2, §7.1 dry run).
REQUIRED: One statement (§4.1, citing §7.1 and item 101 R2); the other two reference it.
CLOSURE: FIX at the unit

### V11-ICONF-1 [internal_conflicts; minor]
Readers lists contain conditional clauses left open: row 62 'should T-V11-1 (b) record those reads under S8, the row lists S8 in that change'; row 80 'should T-V11-1 (b)'s recorded reads tag an epoch stage's S5b as EVO_GROWTH, this row lists EVO_GROWTH in that change, J-V11.92'; row 81 'the same pre-decided move'. The normative readers set is not determined by the text (a readers entry is the invalidation map of §7.6), which is ambiguous normative text bordering on deferral wording.
REQUIRED: Decide the StageId under which an epoch stage's S5b and the seed pass's reads are recorded (per V06 §3.2 / §4.1 registration), and write the determinate readers list.
CLOSURE: conflict ruling V11-ICONF-1

### V11-ICONF-2 [internal_conflicts; minor]
'lumber camp logs 0.9, bark 0.1' and later 'lumber camp logs' (no shares) are both in the produces list: a duplicated entry that reads as two different produces sets for one class.
REQUIRED: Delete the second 'lumber camp logs' entry.
CLOSURE: conflict ruling V11-ICONF-2

### V11-ICONF-3 [internal_conflicts; minor]
§3.13.3 says the compiler emits generic-<f> 'for every profile family f', while §3.2.1 step 5 and §3.5.14 say one per NON-ALIAS family (aliases civic, defence resolve to their target's generic class; 45 generic classes).
REQUIRED: Word §3.13.3 as 'for every non-alias profile family'.
CLOSURE: conflict ruling V11-ICONF-3

### V11-ICONF-4 [internal_conflicts; minor]
'resolveSiting (~230 classes ...)' while §3.5.14 counts 181 authored + 45 generic + 2 sky = 228 plus V07's village classes, which step 6 compiles and T-V11-3/-4/-5 run over; the budget's class count omits the v. rows the derivation also iterates (PLAUSIBLE: depends on whether resolveSiting derives v. rows).
REQUIRED: State the count as read from REGISTRY (as the compile row does) or include V07's v. rows.
CLOSURE: conflict ruling V11-ICONF-4

### V11-ICONF-5 [internal_conflicts; minor]
J-V11.8 says '≈ 179 authored town and city classes', while §3.5.14 counts 181 (fort and lighthouse added) and BCR-V11-11 says '≈ 180'; J-V11.94 says 'a town roster holds ≈ 180 classes'.
REQUIRED: Make J-V11.8 read 181 (or '≈ 180' consistently) and cite §3.5.14's count.
CLOSURE: conflict ruling V11-ICONF-5

### V11-ICONF-6 [internal_conflicts; minor]
§12 states '86 registry catalogue rows (1-85 and 58a)', 'the class count (179 authored)' and wiring 'W1 - W66' as CONFIRMED by script, while the live text has 92 rows, 181 classes and W1-W78.
REQUIRED: Remove with the narration or correct to the live counts.
CLOSURE: conflict ruling V11-ICONF-6

### V11-ICONF-7 [internal_conflicts; minor]
'the tower's record binds the guild's hall' is ambiguous (tower becomes the hall, or a new hall takes the tower's key); V08 §3.5.1 (c)'s first case and V06's convert read it as re-designation in place. Open on the INDEX fix list.
REQUIRED: Cell reads 'the wizard's tower becomes the guild's hall (re-designated in place; V08 §3.5.1 (c)'s first case)'.
CLOSURE: conflict ruling V11-ICONF-7

### V11-XCONF-1 [cross_volume_conflicts; minor]
V11 §3.24.1 says stateSnapCm's register entry is 'V12's retaining line until V12 gives it the line X-V11-17 (f) proposes', but V12 §3.11 excludes stateSnapCm from the retaining line ('every other calibratable column but settings.stateSnapCm') and gives it the default line's entry at M3a, restated in place at V6-E2 by V06 §8's line on bar.T-V6-62, due V6-E7 (J-V12.82). V11's statement is stale and conditional ('until').
REQUIRED: V11 §3.24.1 cites V12 §3.11 (default line at M3a, V06 §8's line from V6-E2); drop 'until'.
CLOSURE: conflict ruling V11-XCONF-1

### V11-XCONF-2 [cross_volume_conflicts; minor]
Row 87 types every messages/<locale>.json as MsgRow, while V09 §2.9 Locales (J-V9.121) types non-English files as {key; text} only (buttons, tone, codes read from en.json); open on the INDEX fix list (V09 XV-V9-31).
REQUIRED: Row 87's row type 'MsgRow for en.json; {key; text} for every other locale file'; loader refuses a locale file carrying buttons, tone or codes; T-V11-1 follows.
CLOSURE: conflict ruling V11-XCONF-2

### V11-XCONF-3 [cross_volume_conflicts; minor]
V11 dates the three bend cells' calibration 'at M3a' while V12's register line (the single home of calibration method and due) calibrates retainingReachM, flatDepthM, coverShare by the M4-110 panel at M4; read literally the two volumes name different milestones.
REQUIRED: V11 says 'written at M3a; calibrated by V12 §3.11's terrace line' (cite, do not restate the due).
CLOSURE: conflict ruling V11-XCONF-3

### V11-XCONF-4 [cross_volume_conflicts; minor]
V11 has the register lint in CI from C0 (M0), before V12's W2 builds the command and before V12's tier starts.
REQUIRED: Cite V12: 'register --check joins CI at M1 (V12 T-V12-20)'; C0's exit drops the clause.
CLOSURE: conflict ruling V11-XCONF-4

### V11-ELEG-1 [elegance_candidates; minor]
The readers of each table are stated three times (W row consumers, §2.10 lifecycle 'read' cell, §3.1 registry readers), and the three already drift (W19 vs row 50, finding wgap V11 1). The item-110 lifecycle rows (terrace, retaining, raisedWays, ways.crossing, deck, deck.landmarks, roster.specialisations, water) repeat one create/read/regenerate/migrate pattern row by row.
REQUIRED: Make §3.1's readers the single source; generate §1b and §2.10's read cells from it (or cite the row number), and state the item-110 lifecycle once as a pattern with per-table exceptions. Shrinks V11 without losing nuance.
CLOSURE: elegance ruling (E-list)

### V11-EDGE-1 [edges_observed; major]
A crossing is a ramp (step over run <= rampMaxGrade, or a switchback within minTerraceDepthM), else a stair when the class has one; a cart class takes a ramp 'up to 1.5 x rampMaxGrade' (W_STEEP_RAMP), 'never a stair and never a gap'. The case where a cart class's crossing needs more than 1.5 x rampMaxGrade and no switchback fits (e.g. a 4 m step, stepMaxCm 400, on a through way at 0.08 with a short run) has no stated outcome (reroute, lower the step, lengthen the ramp past the terrace, or refuse
REQUIRED: Define the outcome beyond 1.5 x (e.g. the levelling lowers the step at that crossing, or the ramp lengthens along the wall) and test it in T-V11-32.
CLOSURE: edge catalogue (EI-V11-EDGE-1)

### V11-EDGE-2 [edges_observed; minor]
Satisfaction clamp(2 - n / target, 0, 1) and the households radius sqrt(per x a_res / pi) are undefined for target = 0 or per = 0 (and a_res = 0 in a district with no residential plots); no range for per/target is stated in the schema comment. PLAUSIBLE.
REQUIRED: State ranges (target > 0, per > 0) in the ColumnSpec and the a_res = 0 case (unit empty -> satisfaction 1 or term skipped).
CLOSURE: edge catalogue (EI-V11-EDGE-2)

### V11-WGAP-1 [wiring_gaps; minor]
W19 lists 'V07 pump date' among EraRow's consumers and V07's VS8 reads the era row's pump date (V07 ~line 2138-2146), but registry row 50's readers list (S3, S5, S7, S11, S12a, S12b, S4, S6, EVO_RAISED, U-SYS) omits V07's village stage; the reader check (compile step 6) would refuse a read by an unlisted stage. The two reader lists for one table disagree.
REQUIRED: Add V07's reading stage (VS8) to row 50's readers; derive W19's consumer list from row 50 instead of restating it.
CLOSURE: wiring routing (V11-WGAP-1)

### V11-MISSING-1 [missing_parts; major]
J122 (docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md) decided Q-V11-1: 'keep, concealed by default in player views, shown as SettlementForge's own settings show them'. V11 still carries it as an open question with a recommendation, not marked answered with J122; and the decision's 'concealed by default in player views' differs from V11's text, which draws the slave market as a VISIBLE market hall (only trafficking and kidnapping concealed) and says nothing of following SettlementForge's own settin
REQUIRED: Mark Q-V11-1 answered (J122) and make the four sensitive kinds concealed by default in player views (concealment rows for slave_market and slave_market_district; the knowledge setting following SettlementForge's own settings), at V11 §3.11/§3.14 with the owner rule as authority.
CLOSURE: FIX at the unit

### V11-MISSING-2 [missing_parts; major]
g item 111 (from item 111 onward, applied by every unit it names) names V11: 'the oasis chance, grove and garden rows, the water-pull weights and the sunlight cell per climate row'. V11 has none of them: no oasis chance or grove/garden rows, no water-pull weights (growth field, prosperity water term, well placement by yield), and item 102's w_sun is one global weight (§3.3.5, 0.02) with no per-climate cell (111 (c): hot arid rows zero or toward shade; neutral values give a no-op pin).
REQUIRED: F-MISSING: write V11's part of item 111 at build depth (rows, constants, the per-climate sun cell with its temperate value = 0.02, the no-op pin, register entries, lifecycle rows, tests).
CLOSURE: FIX at the unit

### V11-MISSING-3 [missing_parts; major]
g item 113 names V11: 'event-to-epoch rows, burial thresholds' (history-first generation: the event-to-epoch mapping's content rows, the replay's coarse-epoch default 'decades', the burial threshold 'a century by default, shortened by floods, river silt and rebuilding, lengthened on bare rock', the symbolic peak's representative value 'the range's lower quartile'). V11 has none of these rows.
REQUIRED: F-MISSING: write V11's part of item 113 (the event-to-epoch table rows, the burial-threshold table with its modifiers, the symbolic-peak sizing cell, their registry rows, readers, lifecycle and tests).
CLOSURE: FIX at the unit

### V11-MISSING-4 [missing_parts; minor]
Normative content lives only in the integration notes ('each note supersedes any sentence of this volume that reads otherwise'): IN-V11-1's ownerRule stamping is absent from §3.2.1 (compile steps) and its calibration minima (chance 0.02, cap 1) from §3.24.2's rows; IN-V11-2's wingRole words 'the seating', 'a gate passage' are absent from §3.20.1's building.wingRole row; IN-V11-3's 'vaults' naming slice appears in neither §3.20.1 nor registry row 68's naming.* list, so a slice V04 relies on has n
REQUIRED: Fold each note into its home section (§3.2.1 step 4/7, §3.24.2, §3.20.1 and registry row 68 gaining naming.vaults) and delete the notes.
CLOSURE: FIX at the unit

### V11-MISSING-5 [missing_parts; minor]
Open on the INDEX fix list: the v. rows' commonness is produced by a V07 script while V11's lifecycle row says the compile recomputes it; step 5a and §3.5.1 compute it only for town-and-city rows (J-SR6.6 chose the compiler as the one producer). A cell with two producers.
REQUIRED: §3.5.1 adds 'for a v. row, V07 §2.4's rule (roster share at VILLAGE's default target, rounded 0.01, never below 0.01)'; step 5a compiles it; T-V11-4 reads 'on a town-and-city or v. row compiled, never stated'.
CLOSURE: FIX at the unit

### V11-MISSING-6 [missing_parts; minor]
V12 §2.10 says 'V11's compiler stamps ownerRule from the owner-rule rows (X-V12-9)' and writes status into dist/evidence.json ({status, lines} per cell, 'owner' for a stamped cell); V11 §3.2.1 step 7 writes dist/evidence.json as 'one line per cited evidence id' and no compile step stamps ownerRule (only integration note IN-V11-1 says so). The producer V12 relies on is missing at its home.
REQUIRED: V11 §3.2.1 gains the ownerRule stamp (step 4 or 5a) and step 7's evidence.json shape {cell: {status, lines}} reading the register; cite V12 §2.10.
CLOSURE: FIX at the unit

### V11-TERM-1 [terminology; minor]
Volume citations use two forms: 'V06 §3.9.9', 'V04 §2.3' beside 'V6 §3.16', 'V5 §3.21', 'V9 §2.6', 'V4 §2.3a', 'V2 §5.4', 'V1-3.15' (V01's internal form); principle (1) prescribes 'V04 §3.2'.
REQUIRED: Canon: one citation form 'V0n §x.y' across the set; rewrite the short forms.
CLOSURE: glossary (retired synonyms) / ID rulings

### V11-DEFER-1 [deferral_wording; minor]
Revision note says 'V11 §13 lists what is deliberately left for later' - deferral wording against principle (6) and the no-defer rule; check §13 content.
REQUIRED: Remove with the revision note; §13 must hold no open item.
CLOSURE: FIX at the unit

### V11-DEFER-2 [deferral_wording; minor]
The cell provenance shorthand 'calibrate-later' (and 'calibrate-later at M1 with its fallback' for detourFactor, §3.5.1) reads as deferral wording against principle (6); the values are set and each is a provisional number with a V12 register entry, so the text should say that instead.
REQUIRED: Replace 'calibrate-later' by the register form ('provisional; V12 §3.11 register entry') throughout V11.
CLOSURE: FIX at the unit

### V11-DEFER-3 [deferral_wording; minor]
The decision records that the 280 kind rows were written from 'the V08 lane's export in the session scratchpad' - a source outside /Users/cstokes/Desktop/Maps (STANDALONE rule, principle (6)); the build source is the committed manifest (registry row 77), which the decision says replaces it.
REQUIRED: Cite research/sf and the committed catalogue manifest as the source; drop the scratchpad reference.
CLOSURE: FIX at the unit

### V11-DEFER-4 [deferral_wording; major]
The fix list keeps three open items under the heading 'What is deliberately left for later' (F-V11-1 ladder lessers, F-V11-2 vocabularies, F-V11-3 other volumes restating V11 rows) - the bar allows no open fix-list item and principle (6) forbids 'later' as an unresolved choice. F-V11-2 is a design decision (vocabularies authored at build under §3.20.6), F-V11-1 is closed by T-V11-2's build failure, F-V11-3 is an open single-source hand-off (X-V11-4, X-V11-11).
REQUIRED: Close each: restate F-V11-1 and F-V11-2 as decisions (J rows), fix F-V11-3 at V04 and V06 (they cite V11 §3.18/§3.23/§3.24.2), and empty the fix list.
CLOSURE: FIX at the unit

### V11-NARR-1 [narration; minor]
Ten stacked 'PENDING FABLE REVIEW' banner lines (one per lane: V11-content, revise-V11, reconcile-V11-r1..r6 and two continuations); principle (8) allows one marker line per volume, the close's.
REQUIRED: Replace by the close's single marker line.
CLOSURE: FIX at the unit

### V11-NARR-2 [narration; minor]
Revision note (lines 14-19, naming a scratchpad pre-revision copy) and seven PROGRESS / REVISION / RECONCILIATION ledgers (about 90 lines) narrate how the text evolved (principle (5)); the validation records (critique/V11.md, seam-*.md, lane-events.log) keep it.
REQUIRED: Remove; the volume opens at its title and the close's marker line.
CLOSURE: FIX at the unit

### V11-NARR-3 [narration; minor]
Wiring rows carry pass narration ('reconciliation round 1, SS-01', 'reconciliation round 4, SCC-75', 'round 2's continuation, SCC-R1C-1', 'round 6, SR5-03', 'the class count corrected') - principle (5); the validation records keep it.
REQUIRED: Strip the parenthesised pass references; keep the section citations.
CLOSURE: FIX at the unit

### V11-NARR-4 [narration; minor]
Normative text carries pass narration in parentheses: 'reconciliation round 3's continuation, SCC-R2C-9', 'SR3-07', 'SCC-77, SCC-R3C-15', 'reconciliation round 6, seam-settlements-r5 SR5-03', 'V11C-22', 'V11C-07', 'V11C-44 (3)' - principle (5); a decision id (J-V11.n) may stay as the rationale pointer, the seam/critique ids go to the validation records.
REQUIRED: Strip seam/critique issue ids and round references from normative text throughout V11; keep J-V11.n pointers.
CLOSURE: FIX at the unit

### V11-NARR-5 [narration; minor]
Critique ids and round narration in headings and normative text ('V4C-63', 'owner ~23:30 ... V11C-33 – V11C-45', 'reconciliation round 6, SCC-104'); principle (5).
REQUIRED: Keep the owner-rule citation (item 110) and drop critique ids and round references.
CLOSURE: FIX at the unit

### V11-NARR-6 [narration; minor]
Lifecycle rows and catalogue status cells carry narration ('the terrace's three bend cells (reconciliation round 1)', 'the pre-round-1 reading', 'reconciliation round 2, SCC-34', 'written here (RV-pc-5)'); principle (5).
REQUIRED: Remove the round/issue references from the lifecycle table and the status cells.
CLOSURE: FIX at the unit

### V11-NARR-7 [narration; minor]
Catalogue cells and the count paragraph carry pass narration ('listed here before', 'reconciliation round 4's continuation, SCC-R3C-7, V01's note (33)', 'outside this round's brief', 'SR3-07', 'SCC-77', 'seam-surfaces-r5 SR5-04', 'SCC-06', 'SCC-44'); principle (5).
REQUIRED: Remove the pass references; keep sections and J-ids.
CLOSURE: FIX at the unit

### V11-NARR-8 [narration; minor]
'(V9 §4.16 (3) as seam-settlements-r6 SR6-03 scopes it; SR6-09 (b), applied by the finalization)' - pass narration inside a normative rule.
REQUIRED: Cite V09 §4.16 (3) only.
CLOSURE: FIX at the unit

### V11-NARR-9 [narration; minor]
'item 110's fort and lighthouse among them, which the count of 179 predated; reconciliation round 6' - narration inside the count.
REQUIRED: State the count (181 = 167 table rows + 2 cluster structures + 12 clandestine) without its history.
CLOSURE: FIX at the unit

### V11-NARR-10 [narration; minor]
'yarn is deleted - spinning was household work' is a disposition of an earlier text, not a rule; principle (5).
REQUIRED: Drop the sentence (the weaver's supply of wool already records the choice) or state the rule positively ('no yarn good; spinning is household work').
CLOSURE: FIX at the unit

### V11-NARR-11 [narration; minor]
'(SR1-02, SR1-07)', 'SS-36', 'V11C-14', 'reconciliation round 6, SR5-11's class', 'SR4-01', 'reconciliation round 5, SR4-02', 'V7C-07', 'the former columns are dropped, V11C-13, V11C-28', 'SCC-06' - pass narration in normative text.
REQUIRED: Strip issue ids and 'former columns dropped' disposition.
CLOSURE: FIX at the unit

### V11-NARR-12 [narration; minor]
'(SR1-19)', '(reconciliation round 6, SR5-11 (a))', 'SS-03', 'SS-09' in table cells; principle (5).
REQUIRED: Strip.
CLOSURE: FIX at the unit

### V11-NARR-13 [narration; minor]
'SR3-01', 'reconciliation round 4, SR3-03', '(SS-05)', '(SS-03)', '(SS-02)', '(SR1-02) (SR1-21)' - pass narration.
REQUIRED: Strip.
CLOSURE: FIX at the unit

### V11-NARR-14 [narration; minor]
'SCC-25', 'SCC-51', 'SCC-09', 'reconciliation round 3, SCC-67', 'IN-V11-2, XV-V9-13', 'SCC-19', 'V12's 23:27 note (4)', 'reconciliation round 3's continuation, SCC-R2C-10' - narration in normative text.
REQUIRED: Strip.
CLOSURE: FIX at the unit

### V11-NARR-15 [narration; minor]
'V09's BCR-V9-30 slot; the constant moves here' - disposition narration; also check V09 no longer states minSpanM 40 (single source).
REQUIRED: State minSpanM here; confirm V09 cites it.
CLOSURE: FIX at the unit

### V11-NARR-16 [narration; minor]
Test and budget rows carry pass narration ('92 at this revision (90 before reconciliation round 4's continuation, SCC-R3C-4; 86 before round 2's continuation, SCC-R1C-3)', 'SR1-08', 'SCC-R2C-2', 'SCC-104', 'reconciliation round 6, SR5-03', 'reconciliation round 1', 'SCC-66', 'SS-07', 'SS-26', 'SCC-13', 'SCC-08'); principle (5).
REQUIRED: Strip from every test, budget and plan row.
CLOSURE: FIX at the unit

### V11-NARR-17 [narration; minor]
Decision rows carry their pass history ('Reconciliation round 2.', '(SCC-44; SCC-06's shape)', 'revised by reconciliation round 1 (SS-13 ...)', 'Amended (round 4's continuation, SCC-R3C-15; J-V11.91)', 'a lane-events note of 07:20 handed this to V07's round-4 lane'); the decision ids and their reasons stay, the round headers and seam ids belong in the validation records (principle (5)); J-V11.77's amended text should be restated as the one current decision.
REQUIRED: Strip round headers and seam ids; fold J-V11.77's amendment into one current statement.
CLOSURE: FIX at the unit

### V11-NARR-18 [narration; major]
About 590 lines (roughly a ninth of the volume) narrate how the text evolved: per-round CONFIRMED/PLAUSIBLE paragraphs, disposition tables by seam id, backup md5s and scratchpad paths, doc_checks counts, lane-event times. Principle (5) removes them (the validation records keep them); they also carry STALE facts that contradict the live text (§12: '86 registry catalogue rows (1-85 and 58a)', 'the class count (179 authored)', 'W1 - W66'), and cite scratchpad paths outside the project.
REQUIRED: Replace §12 by a short CONFIRMED/PLAUSIBLE statement of the current design (the PLAUSIBLE list above), and delete the reconciliation and finalization sections (their dispositions are in docs/volumes/critique/*).
CLOSURE: FIX at the unit

### V11-BREF-1 [broken_references; minor]
'garden' is not a LandUse.kind (§2.7 lists arable, strip_field, meadow, pasture, commons, orchard, vineyard, coppice, wildwood, quarry, claypit, mine, lumber, fishery, saltpan, marsh, reserve; V11 §3.17.2 writes one row per kind and has no garden); §3.7.2 names only meadow as the herbs provider. The herbs site cell points at a land use no stage produces (a dangling input of S10b's provider rasters / S2's need propagation).
REQUIRED: Drop 'garden' from herbs' site (meadow only), or name the Greenery 'garden' as a provider by a stated rule.
CLOSURE: FIX at the unit

### V11-BREF-2 [broken_references; minor]
V11 cites its own sections with a bare § 197 times whose target exists only in V11, not in the base (80 in the body incl. the ledger lines 46-49, 117 in the §10b-§13 tables; e.g. line 46 '§3.11', '§3.12'), beside 'V11 §' elsewhere; V11 states no citation rule, and V12's (and the base's) convention reads a bare § as the base, so these refs resolve only by guessing the volume.
REQUIRED: Qualify every own-section ref as 'V11 §n' (script: rewrite bare § whose target is absent from the base) and state the convention once in the header.
CLOSURE: FIX at the unit

### V11-BREF-3 [broken_references; minor]
Bare 'BCR-n' ids are defined twice (V01 and V04 both number their base change requests BCR-1...), so a bare 'BCR-45' in V11 (e.g. §3.24.2, §12 'the seat landing BCR-45') is ambiguous; V11 writes 'V04 BCR-45' in some places and bare 'BCR-45' in others.
REQUIRED: Cite volume-qualified ids ('BCR-V4-45' / 'V04 BCR-45') everywhere; one id form per concept.
CLOSURE: FIX at the unit

### V11-HANDOFF-1 [handoffs_to_canon; minor]
Hand-offs left open at their destinations with deferral wording; principle (10) requires every hand-off closed at its destination in this pass; the no-defer rule forbids 'next revision/round'.
REQUIRED: Close each hand-off at V08, V09, V07, V04, V12 and f (verify at their inventories) and replace the deferral wording with the closed state.
CLOSURE: FIX at the unit

### SR6-09 (a), (c), (d) [seam-r6-open (INDEX §7 fix list); minor]
docs/volumes/critique/seam-settlements-r6.md SR6-09 (a), (c), (d)
REQUIRED: (a) step 5a's v.-row case (with SR6-08); (c) the mis-attributed seam id corrected; (d) the mages_guild cell (V11-ICONF-7).
CLOSURE: FIX at the unit

### SR6-08 (surfaces) [seam-r6-open (INDEX §7 fix list); minor]
docs/volumes/critique/seam-surfaces-r6.md SR6-08 (surfaces)
REQUIRED: Registry row 87's row type (V11-XCONF-2).
CLOSURE: FIX at the unit

### V11:IN-V11-1 [integration-note; minor]
* **IN-V11-1 (J-VI.10; X-V12-9).** The compiler stamps `ownerRule` (BCR-V12-5) on every cell of an owner-rule row — the `raisedWays` rung gate (`ownerRule: '110 (b)'`), the catacomb TOWN gate, the cemetery-only catacomb sources, the cathedral's `always` crypt, the underground's any-tier existence — 
REQUIRED: fold the note into the body at its home, then drop the note (S9, ID-WX)
CLOSURE: FIX at the unit

### V11:IN-V11-2 [integration-note; minor]
* **IN-V11-2 (J-VI.11; XV-V9-13, V02 X6 and X27).** The `terrace` table gains `retainingReachM` 15 m, `flatDepthM` 12 m and `coverShare` 0.8 (own, calibrate-later; read by volume 9 §4.20.1 (3)'s bend of a retaining stroke on flat ground — folded into `TerraceRow` and V11 §3.24.1's table by reconcili
REQUIRED: fold the note into the body at its home, then drop the note (S9, ID-WX)
CLOSURE: FIX at the unit

### V11:IN-V11-3 [integration-note; minor]
* **IN-V11-3 (J-VI.17 H26; volume 4).** The `vaults` naming slice names an arch-vault run under a raised way "the ⟨way⟩ Arches" (the grammar's guard on the chamber kind `archVault`).
REQUIRED: fold the note into the body at its home, then drop the note (S9, ID-WX)
CLOSURE: FIX at the unit

### V11:IN-V11-4 [integration-note; minor]
* **IN-V11-4 (J-VI.6).** `growthCapShare` 0.01 per year, compounded, is this volume's value; volume 4 now cites it.
REQUIRED: fold the note into the body at its home, then drop the note (S9, ID-WX)
CLOSURE: FIX at the unit

### V11:IN-V11-5 [integration-note; minor]
* **IN-V11-5 (J-VI.9).** §3.24.7 (1)'s criteria row `pc/aqueduct/<way lineage>` is written only on a `conduit_house` the roster or the dossier holds; otherwise the terminal is a fountain pin.
REQUIRED: fold the note into the body at its home, then drop the note (S9, ID-WX)
CLOSURE: FIX at the unit

### V11:IN-V11-6 [integration-note; minor]
* **IN-V11-6 (J-VI.3, J-VI.8; as reconciled in round 1, SS-15, SCC-01).** `walls.barriers` rows are keyed by this volume's eight defensibility classes, each carrying the `arcKind` of J-VI.3's six closure-arc kinds it reports (V11 §2.7, §3.16.1: an arc is a closure feature exactly when its row closes
REQUIRED: fold the note into the body at its home, then drop the note (S9, ID-WX)
CLOSURE: FIX at the unit

### V11:IN-V11-7 [integration-note; minor]
* **IN-V11-7 (J-VI.20).** BCR-V11-26's retirement of `fallbackClass` wins over BCR-V8-29's row type (file f item 425).
REQUIRED: fold the note into the body at its home, then drop the note (S9, ID-WX)
CLOSURE: FIX at the unit

### V11:IN-V11-8 [integration-note; minor]
* **IN-V11-8 (J-VI.25).** W21's dossier column read `site.terrainType`, a field no digest carries; it now reads "`site.terrain`, `site.culture` → biome (the digest's `site` row, V08 §2.6)".
REQUIRED: fold the note into the body at its home, then drop the note (S9, ID-WX)
CLOSURE: FIX at the unit

### V11:IN-V11-9 [integration-note; minor]
* **IN-V11-9 (J-VI.27).** `raisedWays.structure`'s `pierSpacingM`, `pierWidthShare` and `pierMinCm` are read by file f item 244's support step (the piers' pitch and footprint), and `clearanceCm` by that item's clearance rule; `maxPierM` drops a generated course there as §3.24's sentence says.
REQUIRED: fold the note into the body at its home, then drop the note (S9, ID-WX)
CLOSURE: FIX at the unit

### V11:IN-V11-10 [integration-note; minor]
* **IN-V11-10 (J-VI.24).** BCR-V11-31 is carried as file f item 581, with item 377.
REQUIRED: fold the note into the body at its home, then drop the note (S9, ID-WX)
CLOSURE: FIX at the unit
